import { Component, OnInit } from '@angular/core';

import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { Subscription, tap, delay } from 'rxjs';
import { MenuService } from '../../services/menu-service/menu.service';
import { WindowSizeService } from '../../services/window-size-service/window-size.service';

@Component({
  selector: 'app-site-menu',
  templateUrl: './site-menu.component.html',
  styleUrls: ['./site-menu.component.scss']
})
export class SiteMenuComponent implements OnInit {

  public menuVisible: boolean = false;
  public isMobileView: boolean = !this.breakpointObserver.isMatched(['(min-width: 768px)']);
  private subscriptions: Subscription = new Subscription();
  public menuClass = '';
  public transitionDisabledClass = '';

  constructor(
    private router: Router,
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
    private windowSizeService: WindowSizeService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.windowSizeService.windowResize$
      .pipe(
        tap(() => {
          // console.log('adding resize animation stopper')
          this.menuClass += ' resize-animation-stopper'
        }),
        delay(500)
      )
      .subscribe(() => {
        // console.log('removing resize animation stopper')
        this.menuClass = this.menuClass.replace(' resize-animation-stopper', '')
      })
    )
    this.subscriptions.add(
      this.menuService.siteMenuIsOpen$
      .subscribe((menuVisible) => {
        this.menuVisible = menuVisible;
        this.getCorrectMenuClass(this.isMobileView, this.menuVisible);
      })
    )
    this.subscriptions.add(
      this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // console.log('Viewport width is 768px or greater!');
          // this.closeSiteMenu();
          this.isMobileView = false;
          this.getCorrectMenuClass(this.isMobileView, this.menuVisible);
        } else {
          // console.log('Viewport width is less than 768px!');
          // this.closeSiteMenu()
          this.isMobileView = true;
          this.getCorrectMenuClass(this.isMobileView, this.menuVisible);
        }
      })
    )
  }

  private getCorrectMenuClass(isMobileView: boolean, menuVisible: boolean): void {
    if (isMobileView && menuVisible) {
      this.menuClass = 'mobile-menu-active'
    } else if (!isMobileView && menuVisible) {
      this.menuClass = 'desktop-menu-active'
    } else if (isMobileView && !menuVisible) {
      this.menuClass = 'mobile-menu-inactive'
    } else if (!isMobileView && !menuVisible) {
      this.menuClass = 'desktop-menu-inactive'
    }
  }

  public closeSiteMenu(): void {
    this.menuService.closeMenu();
  }

  public handleHomeBtn(): void {
    this.router.navigate(['/']);
    window.scroll(0, 0);
    this.menuService.closeMenu();
  }

  public handleCloseBtn(): void {
    this.closeSiteMenu()
  }

  public handleBlogBtn(): void {
    this.router.navigate(['/blog']);
    window.scroll(0, 0);
    this.menuService.closeMenu();
  }

  public handleIoGardenBtn(): void {
    this.router.navigate(['/io-garden']);
    window.scroll(0, 0);
    this.menuService.closeMenu();
  }

  public handleAboutBtn(): void {
    this.router.navigate(['/about']);
    window.scroll(0, 0);
    this.menuService.closeMenu();
  }

}
