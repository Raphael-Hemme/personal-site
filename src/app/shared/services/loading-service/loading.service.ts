import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  Subject,
  Subscription,
  tap,
  filter,
  BehaviorSubject,
  combineLatestWith,
} from 'rxjs';

export type ViewInitSignalValue =
  | 'LOADING'
  | 'ABOUT'
  | 'BLOG'
  | 'BLOG-POST'
  | 'IO-GARDEN'
  | 'IO-GARDEN-EXPERIMENT'
  | 'HOME'
  | 'PAGE-NOT-FOUND'
  | 'LEGAL-NOTICE'
  | 'PRIVACY-POLICY';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private afterViewInitSignal$$ = new Subject<ViewInitSignalValue>();

  private isLoading$$ = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.isLoading$$.asObservable();

  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {
    this.subscriptions.add(
      this.router.events
        .pipe(
          tap((routerEvent) => {
            if (routerEvent instanceof NavigationStart) {
              this.afterViewInitSignal$$.next('LOADING');
              this.isLoading$$.next(true);
            }
          }),
          filter((routerEvent) => routerEvent instanceof NavigationEnd),
          combineLatestWith(this.afterViewInitSignal$$)
        )
        .subscribe(([, viewInitSignal]) => {
          if (viewInitSignal !== 'LOADING') {
            this.isLoading$$.next(false);
          }
        })
    );
  }

  /**
   * Emits the view init signal to the afterViewInitSignal$$ subject.
   * @param path The path to emit.
   */
  public emitAfterViewInitSignal(path: ViewInitSignalValue): void {
    this.afterViewInitSignal$$.next(path);
  }
}
