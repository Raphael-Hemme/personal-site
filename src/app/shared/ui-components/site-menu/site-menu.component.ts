import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-site-menu',
  templateUrl: './site-menu.component.html',
  styleUrls: ['./site-menu.component.scss']
})
export class SiteMenuComponent implements OnInit {

  @Output() closeSiteMenuEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeSiteMenu(): void {
    this.closeSiteMenuEvent.emit(true);
  }

}
