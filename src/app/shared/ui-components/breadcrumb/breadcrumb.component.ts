import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbObj, NavigationService } from '../../services/navigation-service/navigation.service';
import { Subscription, tap } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    imports: [RouterLink],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit, OnDestroy{

  public breadcrumbArr: BreadcrumbObj[] = [];
  public breadcrumbsAreVisible = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly navigationService: NavigationService
  ) {
    
  }

  ngOnInit(): void {
    this.registerBreadCrumbSubscription();
    this.registerBreadcrumbsAreVisibleSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private registerBreadCrumbSubscription(): void {
    this.subscriptions.add(
      this.navigationService.getBreadcrumbsArr()
        .pipe(
          tap(breadcrumbArr => this.breadcrumbArr = breadcrumbArr)
        )
        .subscribe()
    );
  }

  private registerBreadcrumbsAreVisibleSubscription(): void {
    this.subscriptions.add(
      this.navigationService.breadcrumbsAreVisible$
        .pipe(
          tap(areVisible => this.breadcrumbsAreVisible = areVisible)
        )
        .subscribe()
    );
  }
}
