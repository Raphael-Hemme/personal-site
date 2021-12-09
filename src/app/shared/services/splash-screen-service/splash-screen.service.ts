import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  public splashScreenTimer$ = timer(5000);
  private splashScreenIsVisible = true;

  constructor() { }

/*   public splashScreenTimeout$(): Observable<any> {
    return timer(5000);
    // this.splashScreenTimeOut = setTimeout(() => this.splashScreenIsVisible = false, 5000)
  } */

  public setSplashScreenIsInvisible(value: boolean): void {
    this.splashScreenIsVisible = value;
  }

  public getSplashScreenInvisible(): boolean {
    return this.splashScreenIsVisible;
  }

}
