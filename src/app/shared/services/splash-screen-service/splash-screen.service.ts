import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, timer, tap } from 'rxjs';

type splashStatus = 'on' | 'off'

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  public splashScreenTimer$ = timer(5000);
  public splashScreenStatus = new BehaviorSubject<splashStatus>('on')

  constructor() { }

  public startTimerAndHandleStatus(): Observable<splashStatus> {
    return this.splashScreenTimer$.pipe(
      tap (() => this.splashScreenStatus.next('off')),
      switchMap(() => {
        return this.splashScreenStatus;
      })
    )
  }
}
