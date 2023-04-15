import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('mainContentContainer') mainContentContainer!: ElementRef;

  public title = 'raphaelhemme';
  public smallLogoIsVisible = false;

  private currRoute: BehaviorSubject<string> = new BehaviorSubject('');

  private subscriptions: Subscription = new Subscription()
  public currLoading!: boolean;


  constructor(
    private router: Router,
    private location: Location,
    private loadingService: LoadingService,
    private menuService: MenuService
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

    this.subscriptions.add(
      this.loadingService.isLoading$.subscribe(loadingState => this.currLoading = loadingState)
    );

    this.subscriptions.add(
      this.menuService.smallLogoIsVisible$.subscribe(smallLogoIsVisible => this.smallLogoIsVisible = smallLogoIsVisible)
    );
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

}
