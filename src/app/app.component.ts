import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { Router,
  NavigationEnd } from '@angular/router';
import {
  BehaviorSubject,
  Subscription,
  filter,
  map } from 'rxjs';
import { LoadingService } from './shared/services/loading-service/loading.service';
import { MenuService } from './shared/services/menu-service/menu.service';
import { SearchService } from './shared/services/search-service/search.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('mainContentContainer') mainContentContainer!: ElementRef;

  public title = 'raphaelhemme';
  public smallLogoIsVisible!: boolean;

  private currRoute: BehaviorSubject<string> = new BehaviorSubject('');

  private subscriptions: Subscription = new Subscription()
  // public currLoading = true;

  public readonly searchComponentIsVisible$ = this.searchService.searchComponentIsVisible$;
  public readonly isLoading$ = this.loadingService.isLoading$;


  constructor(
    private router: Router,
    private location: Location,
    private loadingService: LoadingService,
    private menuService: MenuService,
    private cD: ChangeDetectorRef,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          map(e => { return e }))
        .subscribe(() => {
          this.currRoute.next(this.location.path());
      })
    );

/*     this.subscriptions.add(
      this.loadingService.isLoading$.subscribe(loadingState => this.currLoading = loadingState)
    ); */

    this.subscriptions.add(
      this.menuService.smallLogoIsVisible$.subscribe(smallLogoIsVisible => {
        this.smallLogoIsVisible = smallLogoIsVisible;
        this.cD.detectChanges();
      })
    );

    // this.handleLoadingState();
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

 /*  private handleLoadingState(): void {
    this.subscriptions.add(
      this.loadingService.isLoading$.subscribe(loadingState => {
        this.currLoading = loadingState;
        console.log('loading state', loadingState)
        this.cD.detectChanges();
      })
    )
  } */

}
