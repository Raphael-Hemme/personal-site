import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'raphaelhemme';
  public splashScreenIsVisible = true;
  private splashScreenTimeOut: any;

  ngOnInit(): void {
    this.splashScreenTimeOut = setTimeout(() => this.splashScreenIsVisible = false, 5000)
  }

  ngOnDestroy(): void {
    clearTimeout(this.splashScreenTimeOut);
  }

}
