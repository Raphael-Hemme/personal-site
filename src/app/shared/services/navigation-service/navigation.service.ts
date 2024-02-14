import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  filter,
  switchMap,
  tap,
} from 'rxjs';

export type BreadcrumbObj = {
  displayStr: string;
  link: string;
  index: number;
};

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private pathSegmentArr$$ = new BehaviorSubject<string>('');
  public pathSegmentArr$ = this.pathSegmentArr$$.asObservable();
  private breadcrumbsArr$$ = new BehaviorSubject<BreadcrumbObj[]>([]);
  public breadcrumbsArr$ = this.breadcrumbsArr$$.asObservable();

  private breadcrumbsAreVisible$$ = new BehaviorSubject<boolean>(false);
  public breadcrumbsAreVisible$ = this.breadcrumbsAreVisible$$.asObservable();

  private subscriptions = new Subscription();

  constructor(private router: Router) {}

  public checkIfBreadCrumbsShouldBeVisible(currRoute: string): boolean {
    console.log('currRoute: ', currRoute);
    return currRoute !== '' && currRoute !== '/';
  }

  public getBreadcrumbsArr(): Observable<BreadcrumbObj[]> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => {
        this.breadcrumbsAreVisible$$.next(
          this.checkIfBreadCrumbsShouldBeVisible(event.url)
        );
      }),
      tap((event: NavigationEnd) => {
        const rawBreadcrumbArr = this.generateRawBreadcrumbArr(event.url);
        this.breadcrumbsArr$$.next(
          this.generateFinalBreadcrumbArr(rawBreadcrumbArr)
        );
      }),
      switchMap(() => this.breadcrumbsArr$$)
    );
  }

  private generateRawBreadcrumbArr(currRoute: string): string[] {
    const blogAndIoGardenSegmentRegex = /\/post\/.*|\/experiment\/.*/;

    if (blogAndIoGardenSegmentRegex.test(currRoute)) {
      const result = currRoute.split('/').slice(0, 2);

      result.push(currRoute.split('/').slice(2).join('/'));

      return result;
    } else {
      return currRoute.split('/');
    }
  }

  private generateFinalBreadcrumbArr(routeSegments: string[]): BreadcrumbObj[] {
    return routeSegments
      .map((el: string, i: number, arr: string[]) => this.generateBreadcrumbObj(el, i, arr))
      .reduce((arr: BreadcrumbObj[], el: BreadcrumbObj, i: number) => this.insertSlashReducer(arr, el, i), [])
      .slice(0, -1);
  }

  private generateBreadcrumbObj(pathFragString: string, i: number, segMentArr: string[]): BreadcrumbObj {
    return {
      displayStr: pathFragString ? pathFragString : '~',
      link: segMentArr.slice(0, i + 1).join('/'),
      index: i,
    };
  }

  private insertSlashReducer(breadcrumbsArr: BreadcrumbObj[], el: BreadcrumbObj, i: number): BreadcrumbObj[] {
    const arr = breadcrumbsArr.slice();
    arr.push(el);
    if (i % 1 === 0) {
      arr.push({
        displayStr: ' / ',
        link: 'NONE',
        index: i,
      });
    }
    return arr;
  }
}