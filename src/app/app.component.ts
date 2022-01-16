import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import {
  BehaviorSubject,
  fromEvent,
  Subscription,
  combineLatest,
  filter,
  map } from 'rxjs';
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
  public siteMenuIsVisible = false;
  public smallLogoIsVisible = false;

  private scrollEventObserver = fromEvent(document, 'scroll');
  private currRoute: BehaviorSubject<string> = new BehaviorSubject('');
  private currScrollY: BehaviorSubject<number> = new BehaviorSubject(0);

  private subscriptions: Subscription = new Subscription()

  constructor(
    private windowSizeService: WindowSizeService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    /* this.subscriptions.add(
      this.splashScreenService.startTimerAndHandleStatus().subscribe(res => {
        console.log(res);
        this.splashScreenStatus = res
      })
    ) */
    this.subscriptions.add(
      this.scrollEventObserver.subscribe(() => this.currScrollY.next(window.scrollY))
    )
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          map(e => { return e }))
        .subscribe(() => {
          this.currRoute.next(this.location.path());
      })
    )
    this.subscriptions.add(
      combineLatest([this.currRoute, this.currScrollY]).subscribe(([currRoute, currScrollY]) => {
        if (currRoute) {
          this.smallLogoIsVisible = true;
        } else if (!currRoute && currScrollY <= window.innerHeight) {
          this.smallLogoIsVisible = false;
        } else {
          this.smallLogoIsVisible = true;
        }
      })
    )
  }

  ngAfterViewInit(): void {
    /* this.windowSizeService.setCurrentMainContainerWidth(this.mainContentContainer.nativeElement.offsetWidth);
    this.windowSizeService.setCurrentMainContainerHeight(this.mainContentContainer.nativeElement.offsetHeight) */
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public toggleSiteMenuVisibility(): void {
    this.siteMenuIsVisible = !this.siteMenuIsVisible;
  }

  public handleLogoClick() {
    this.siteMenuIsVisible = false;
    this.router.navigate(['/'])
  }

}
