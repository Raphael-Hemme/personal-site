import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject, Subscription, tap, filter, fromEvent, BehaviorSubject, takeUntil, combineLatestWith } from 'rxjs';


export type ViewInitSignalValue = 'LOADING' | 'ABOUT' | 'BLOG' | 'BLOG-POST' | 'IO-GARDEN' | 'IO-GARDEN-EXPERIMENT' | 'HOME' | 'PAGE-NOT-FOUND';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private afterViewInitSignal$$ = new Subject<ViewInitSignalValue>();
  private initialLoadingScreenWasRemoved$$ = new Subject<boolean>();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();
  
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router
  ) { 
    this.subscriptions.add(
      this.afterViewInitSignal$$.pipe(
        takeUntil(this.initialLoadingScreenWasRemoved$$)
      ).subscribe(() => {
        this.removeInitialLoadingScreen();
      })
    );

    this.subscriptions.add(
      this.router.events.pipe(
        tap((e) => {
          if (e instanceof NavigationStart) {
            this.afterViewInitSignal$$.next('LOADING');
            this.isLoading$$.next(true);
          }
        }),
        filter((e) => e instanceof NavigationEnd),
        combineLatestWith(this.afterViewInitSignal$$),
      ).subscribe(([e, viewInitSignal]) => {
        if (viewInitSignal !== 'LOADING') {
          this.isLoading$$.next(false);
        }
      })
    );
  }

  public emitAfterViewInitSignal(path: ViewInitSignalValue): void {
    this.afterViewInitSignal$$.next(path);
  }

  public removeInitialLoadingScreen(): void {
    const initialLoadingScreen = document.getElementById('inititial-loading-screen');
    if (initialLoadingScreen) {
      initialLoadingScreen.classList.add('initial-loading-screen--hidden');
      initialLoadingScreen.classList.remove('initial-loading-screen');
      this.initialLoadingScreenWasRemoved$$.next(true);
    }
  }
}
