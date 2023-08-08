import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data-service/data.service';

import { IoGardenExperimentMetaData, IoGardenService } from '../../services/io-garden-service/io-garden.service';
import { LoadingService } from '../../services/loading-service/loading.service';

@Component({
  selector: 'app-io-garden-experiment-container',
  templateUrl: './io-garden-experiment-container.component.html',
  styleUrls: ['./io-garden-experiment-container.component.scss']
})
export class IoGardenExperimentContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  public currExperiment: any;
  public currExperimentId: string = '';
  public currexperimentMetaData!: IoGardenExperimentMetaData;
  public currExperimentIdAsArr: any;

  private originUrl = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private ioGardenService: IoGardenService,
    private dataService: DataService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.currExperimentId = this.extractIdFromUrl();

    this.getExperimentMetaDataAndIdAsArr();

    this.subscriptions.add(
      this.dataService.originOfNavigation$.subscribe(origin => this.originUrl = origin)
    );
  }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('IO-GARDEN-EXPERIMENT');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public handleBackBtn() {
    const currPath = `/${this.originUrl}`;
    this.router.navigate([currPath]);
  }

  private extractIdFromUrl(): string {
    const fullUrl = this.router.url;
    const urlAsArr = fullUrl.split('/')
    return urlAsArr[urlAsArr.length - 1];
  }

  private getExperimentMetaDataAndIdAsArr(): void {
    this.currexperimentMetaData = this.ioGardenService.getIoGardenMetaDataById(this.currExperimentId);
    this.currExperimentIdAsArr = this.currexperimentMetaData.id.split('');
  }


}
