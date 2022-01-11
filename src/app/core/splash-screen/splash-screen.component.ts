import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  public startSplashScreenFade = false
  private splashScreenFadeTimeout: any;

  constructor() { }

  ngOnInit(): void {
    // this.splashScreenFadeTimeout = setTimeout(() => this.startSplashScreenFade = true, 4000)
  }

  ngOnDestroy(): void {
    // clearTimeout(this.splashScreenFadeTimeout)
  }

}
