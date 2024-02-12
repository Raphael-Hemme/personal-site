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
    .subscribe();
  }

  public navigateBack(): void {
    let blogAndIoGardenSegmentRegex = /\/post\/.*|\/experiment\/.*/;
    // root/blog/post/blog-post-id
    // root/io-garden/experiment/experiment-id
    const currRoute = this.currRoute$$.value
    if (this.lastRoute$$.value) {
      const targetRoute = this.lastRoute$$.value.includes(this.currRoute$$.value) ? '' : this.lastRoute$$.value;
      this.router.navigate([targetRoute]);
    } else {
      let parentPath = blogAndIoGardenSegmentRegex.test(currRoute)
        ? currRoute.replace(blogAndIoGardenSegmentRegex, '')
        : '';
      this.router.navigate([parentPath]);
    }
  }

  public navigateForward(): void {
    this.router.navigate([this.lastRoute$$.value]);
  }

  public checkIfForwardNavIsAllowed(currRoute: string): boolean {
    const excludedPathsRegex = /\/post\/.*|\/experiment\/.*|\/about.*|\/privacy-policy.*|\/legal-notice.*/;

    const result = !(
      excludedPathsRegex.test(currRoute) ||
      currRoute === '' ||
      currRoute === '/' ||
      !this.lastRoute$$.value.includes(this.currRoute$$.value)
    );
    return result;
  }
}
