import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading = true;

  private isLoading$$ = new BehaviorSubject<boolean>(true);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor() { }

  public startLoading(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.isLoading$$.next(true);
    }
  }

  public stopLoading(): void {
    if (this.isLoading) {
      this.isLoading = false;
      this.isLoading$$.next(false);
    }
  }


}
