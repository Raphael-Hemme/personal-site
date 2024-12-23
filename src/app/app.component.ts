import { Location, NgClass, AsyncPipe } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import {
  BehaviorSubject,
  Subscription,
  filter,
  map } from 'rxjs';
import { LoadingService } from './shared/services/loading-service/loading.service';
import { MenuService } from './shared/services/menu-service/menu.service';
import { SearchService } from './shared/services/search-service/search.service';
import { SearchComponent } from './shared/components/search/search.component';
import { SiteMenuComponent } from './shared/ui-components/site-menu/site-menu.component';
import { LoadingSpinnerComponent } from './shared/ui-components/loading-spinner/loading-spinner.component';
import { SiteNavBarComponent } from './shared/ui-components/site-nav-bar/site-nav-bar.component';
import { BreadcrumbObj, NavigationService } from './shared/services/navigation-service/navigation.service';
import { BreadcrumbComponent } from './shared/ui-components/breadcrumb/breadcrumb.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        NgClass,
        SiteMenuComponent,
        RouterOutlet,
        SearchComponent,
        AsyncPipe,
        LoadingSpinnerComponent,
        SiteNavBarComponent,
        BreadcrumbComponent
    ]
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('mainContentContainer') mainContentContainer!: ElementRef;

  public title = 'raphaelhemme';
  public smallLogoIsVisible!: boolean;

  private currRoute: BehaviorSubject<string> = new BehaviorSubject('');

  private subscriptions: Subscription = new Subscription()
  public currLoading = true;

  public breadcrumbArr: BreadcrumbObj[] = [];

  public readonly searchComponentIsVisible$ = this.searchService.searchComponentIsVisible$;
  public readonly isLoading$ = this.loadingService.isLoading$;

  constructor(
    private router: Router,
    private location: Location,
    private loadingService: LoadingService,
    private menuService: MenuService,
    private changeDetectorRef: ChangeDetectorRef,
    private searchService: SearchService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          map(e => { return e }),
        )
        .subscribe(() => {
          this.currRoute.next(this.location.path());
      })
    );

    this.subscriptions.add(
      this.menuService.smallLogoIsVisible$.subscribe(smallLogoIsVisible => {
        this.smallLogoIsVisible = smallLogoIsVisible;
        this.changeDetectorRef.detectChanges();
      })
    );

    this.handleLoadingState();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openSiteMenu(): void {
    this.menuService.openMenu();
  }

  public handleLogoClick() {
    this.menuService.closeMenu();
    this.router.navigate(['/'])
    window.scroll(0, 0);
  }

  private handleLoadingState(): void {
    this.subscriptions.add(
      this.loadingService.isLoading$.subscribe(loadingState => {
        this.currLoading = loadingState;
        this.changeDetectorRef.detectChanges();
      })
    )
  }
}
