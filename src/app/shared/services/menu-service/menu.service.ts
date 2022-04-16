import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private siteMenuIsOpen: boolean = false;
  private siteMenuIsOpen$$: BehaviorSubject<boolean> = new BehaviorSubject(this.siteMenuIsOpen);
  public siteMenuIsOpen$: Observable<boolean> = this.siteMenuIsOpen$$.asObservable();

  constructor() { }

  public openMenu(): void {
    if (!this.siteMenuIsOpen) {
      this.siteMenuIsOpen = true;
      this.siteMenuIsOpen$$.next(true);
    }
  }

  public closeMenu(): void {
    if (this.siteMenuIsOpen) {
      this.siteMenuIsOpen = false;
      this.siteMenuIsOpen$$.next(false);
    }
  }

  public toggleMenu(): void {
    if (this.siteMenuIsOpen) {
      this.siteMenuIsOpen = false;
      this.siteMenuIsOpen$$.next(false);
    } else {
      this.siteMenuIsOpen = true;
      this.siteMenuIsOpen$$.next(true);
    }
  }
}
