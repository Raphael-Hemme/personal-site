import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currRoute$$ = new BehaviorSubject<string>('');
  public currRoute$ = this.currRoute$$.asObservable();
  private lastRoute$$ = new BehaviorSubject<string>('');
  public lastRoute$ = this.lastRoute$$.asObservable();

  constructor(
    private router: Router
  ) {
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => {
        this.lastRoute$$.next(this.currRoute$$.value);
        this.currRoute$$.next(event.url);
      })
    )
    .subscribe((event) => {
      console.log('event', event);
    });
   }

   public navigateBack(): void {
     this.router.navigate([this.lastRoute$$.value]);
   }
}
