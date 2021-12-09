import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SplashScreenService } from './shared/services/splash-screen-service/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'raphaelhemme';
  public splashScreenIsVisible = true;
  // private splashScreenTimeOut: any;
  private subscriptions: Subscription = new Subscription()

  constructor(
    private splashScreenService: SplashScreenService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.splashScreenService.splashScreenTimer$.subscribe(() => {
        this.splashScreenIsVisible = false;
      })
    )
    // this.splashScreenTimeOut = setTimeout(() => this.splashScreenIsVisible = false, 5000)
  }

  ngOnDestroy(): void {
    // clearTimeout(this.splashScreenTimeOut);
    this.subscriptions.unsubscribe();
  }

}
