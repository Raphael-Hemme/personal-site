import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SplashScreenService } from './shared/services/splash-screen-service/splash-screen.service';
import { WindowSizeService } from './shared/services/window-size-service/window-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('mainContentContainer') mainContentContainer!: ElementRef;

  public title = 'raphaelhemme';
  public splashScreenStatus = 'on';
  public sidenavIsVisible = false;

  private subscriptions: Subscription = new Subscription()

  constructor(
    private splashScreenService: SplashScreenService,
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.splashScreenService.startTimerAndHandleStatus().subscribe(res => {
        console.log(res);
        this.splashScreenStatus = res
      })
    )
  }

  ngAfterViewInit(): void {
    // console.log('setting width in service to: ', this.mainContentContainer.nativeElement.offsetWidth);
    this.windowSizeService.setCurrentMainContainerWidth(this.mainContentContainer.nativeElement.offsetWidth);
    // console.log('setting height in service to: ', this.mainContentContainer.nativeElement.offsetHeight);
    this.windowSizeService.setCurrentMainContainerHeight(this.mainContentContainer.nativeElement.offsetHeight)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public toggleSidenavVisibility(): void {
    this.sidenavIsVisible = !this.sidenavIsVisible;
  }

}
