import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject, Subscription, tap, filter, fromEvent, BehaviorSubject, takeUntil, combineLatestWith, ReplaySubject, take } from 'rxjs';


export type ViewInitSignalValue = 'LOADING' | 'ABOUT' | 'BLOG' | 'BLOG-POST' | 'IO-GARDEN' | 'IO-GARDEN-EXPERIMENT' | 'HOME' | 'PAGE-NOT-FOUND';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private afterViewInitSignal$$ = new Subject<ViewInitSignalValue>();
  private initialLoadingScreenWasRemoved$$ = new Subject<boolean>();

  private isLoading$$ = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.isLoading$$.asObservable();
  
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router
  ) { 
    this.subscriptions.add(
      this.afterViewInitSignal$$.pipe(
        tap((viewInitSignal) => console.log('view init signal', viewInitSignal)),
        take(1)
        // takeUntil(this.initialLoadingScreenWasRemoved$$)
      ).subscribe(() => {
        this.removeInitialLoadingScreen();
      })
    );

    this.subscriptions.add(
      this.router.events.pipe(
        tap((routerEvent) => {
          if (routerEvent instanceof NavigationStart) {
            this.afterViewInitSignal$$.next('LOADING');
            this.isLoading$$.next(true);
          }
        }),
        filter((routerEvent) => routerEvent instanceof NavigationEnd),
        combineLatestWith(this.afterViewInitSignal$$),
      ).subscribe(([routerEvent, viewInitSignal]) => {
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
    let initialLoadingScreen = document.getElementById('inititial-loading-screen');
    console.log('initialLoadingScreen before remove: ', initialLoadingScreen)
    document.documentElement.style.setProperty('--loading-screen-display', 'none');
    if (initialLoadingScreen) {
      // initialLoadingScreen.classList.add('initial-loading-screen--hidden');
      // initialLoadingScreen.classList.remove('initial-loading-screen');
      // initialLoadingScreen.remove();
      this.initialLoadingScreenWasRemoved$$.next(true);
      console.log('removed')
    }
  }
}
