import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router,
  NavigationEnd,
  RoutesRecognized } from '@angular/router';
import {
  BehaviorSubject,
  fromEvent,
  Subscription,
  combineLatest,
  filter,
  // pairwise,
  map } from 'rxjs';
import { LoadingService } from './shared/services/loading-service/loading.service';
import { MenuService } from './shared/services/menu-service/menu.service';
// import { WindowSizeService } from './shared/services/window-size-service/window-size.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mainContentContainer') mainContentContainer!: ElementRef;

  public title = 'raphaelhemme';
  public smallLogoIsVisible = false;

  private scrollEventObserver = fromEvent(document, 'scroll');
  private currRoute: BehaviorSubject<string> = new BehaviorSubject('');
  private currScrollY: BehaviorSubject<number> = new BehaviorSubject(0);

  private subscriptions: Subscription = new Subscription()
  public currLoading!: boolean;


  constructor(
    // private windowSizeService: WindowSizeService,
    private router: Router,
    private location: Location,
    private loadingService: LoadingService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    /* this.subscriptions.add(
      this.scrollEventObserver.subscribe(() => this.currScrollY.next(window.scrollY))
    ) */
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          map(e => { return e }))
        .subscribe(() => {
          this.currRoute.next(this.location.path());
      })
    )
/*     this.subscriptions.add(
      combineLatest([this.currRoute, this.currScrollY]).subscribe(([currRoute, currScrollY]) => {
        if (currRoute) {
          this.smallLogoIsVisible = true;
        } else if (!currRoute && currScrollY <= window.innerHeight) {
          this.smallLogoIsVisible = false;
        } else {
          this.smallLogoIsVisible = true;
        }
      })
    ) */
    this.subscriptions.add(
      this.loadingService.isLoading$.subscribe(loadingState => this.currLoading = loadingState)
    )
  }
  
  ngAfterViewInit(): void {
    /* this.windowSizeService.setCurrentMainContainerWidth(this.mainContentContainer.nativeElement.offsetWidth);
    this.windowSizeService.setCurrentMainContainerHeight(this.mainContentContainer.nativeElement.offsetHeight) */
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openSiteMenu(): void {
    // this.siteMenuIsVisible = !this.siteMenuIsVisible;
    this.menuService.openMenu();
  }

  public handleLogoClick() {
    // this.siteMenuIsVisible = false;
    this.menuService.closeMenu();
    this.router.navigate(['/'])
    window.scroll(0, 0);
  }

}
