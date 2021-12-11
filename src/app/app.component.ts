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
  public splashScreenStatus = 'on';
  private subscriptions: Subscription = new Subscription()

  constructor(
    private splashScreenService: SplashScreenService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.splashScreenService.startTimerAndHandleStatus().subscribe(res => {
        console.log(res);
        this.splashScreenStatus = res
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
