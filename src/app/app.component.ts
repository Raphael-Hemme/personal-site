import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef, 
  AfterContentChecked} from '@angular/core';
import { Router,
  NavigationEnd,
  RoutesRecognized } from '@angular/router';
import {
  BehaviorSubject,
  fromEvent,
  Subscription,
  combineLatest,
  filter,
  pairwise,
  map,
  tap } from 'rxjs';
import { LoadingService } from './shared/services/loading-service/loading.service';
import { WindowSizeService } from './shared/services/window-size-service/window-size.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {

  @ViewChild('mainContentContainer') mainContentContainer!: ElementRef;

  public title = 'raphaelhemme';
  public splashScreenStatus = 'on';
  public siteMenuIsVisible = false;
  public smallLogoIsVisible = false;

  private scrollEventObserver = fromEvent(document, 'scroll');
  private currRoute: BehaviorSubject<string> = new BehaviorSubject('');
  private currScrollY: BehaviorSubject<number> = new BehaviorSubject(0);

  private subscriptions: Subscription = new Subscription()
  public currLoading = true;


  constructor(
    private windowSizeService: WindowSizeService,
    private router: Router,
    private location: Location,
    private loadingService: LoadingService
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
          // window.scroll(0, 0);
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
    this.subscriptions.add(
      this.loadingService.isLoading$.subscribe(loadingState => this.currLoading = loadingState)
    )
  }

  ngAfterViewInit(): void {
    /* this.windowSizeService.setCurrentMainContainerWidth(this.mainContentContainer.nativeElement.offsetWidth);
    this.windowSizeService.setCurrentMainContainerHeight(this.mainContentContainer.nativeElement.offsetHeight) */
  }

  ngAfterContentChecked(): void {
    this.loadingService.stopLoading();
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
    window.scroll(0, 0);
  }

}
