import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SplashScreenService } from 'src/app/shared/services/splash-screen-service/splash-screen.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private subscriptions: Subscription = new Subscription()

  constructor(
    private splashScreenService: SplashScreenService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.splashScreenService.splashScreenTimer$.subscribe(next => {
        this.splashScreenService.splashScreenStatus.next('off');
      }
      )
    )
    // this.splashScreenTimeOut = setTimeout(() => this.splashScreenIsVisible = false, 5000)
  }

  ngOnDestroy(): void {
    // clearTimeout(this.splashScreenTimeOut);
    this.subscriptions.unsubscribe();
  }

}
