import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuService } from '../../services/menu-service/menu.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
  selector: 'app-site-nav-bar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './site-nav-bar.component.html',
  styleUrl: './site-nav-bar.component.scss'
})
export class SiteNavBarComponent {
  @Input() public smallLogoIsVisible = false;

  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly navigationService: NavigationService
  ) {}

  public openSiteMenu(): void {
    this.menuService.openMenu();
  }

  public handleLogoClick() {
    this.menuService.closeMenu();
    this.router.navigate(['/'])
    window.scroll(0, 0);
  }

  public handleBackButtonClick() {
    this.navigationService.navigateBack();
  }
}
