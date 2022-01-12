import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-menu',
  templateUrl: './site-menu.component.html',
  styleUrls: ['./site-menu.component.scss']
})
export class SiteMenuComponent implements OnInit {

  @Output() closeSiteMenuEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public closeSiteMenu(): void {
    this.closeSiteMenuEvent.emit(true);
  }

  public handleHomeBtn(): void {
    this.router.navigate(['/']);
    this.closeSiteMenuEvent.emit(true);
  }

  public handleCloseBtn(): void {
    this.closeSiteMenu()
  }

  public handleBlogBtn(): void {
    this.router.navigate(['/blog']);
    this.closeSiteMenuEvent.emit(true);
  }

  public handleIoGardenBtn(): void {
    this.router.navigate(['/io-garden']);
    this.closeSiteMenuEvent.emit(true);
  }

  public handleAboutBtn(): void {
    this.router.navigate(['/about']);
    this.closeSiteMenuEvent.emit(true);
  }

}
