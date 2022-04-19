import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data-service/data.service';

import { IoGardenExperimentMetaData, IoGardenService } from '../../services/io-garden-service/io-garden.service';

@Component({
  selector: 'app-io-garden-experiment-container',
  templateUrl: './io-garden-experiment-container.component.html',
  styleUrls: ['./io-garden-experiment-container.component.scss']
})
export class IoGardenExperimentContainerComponent implements OnInit, OnDestroy {

  public currExperiment: any;
  public currExperimentId: string = '';
  public currexperimentMetaData!: IoGardenExperimentMetaData;
  public currExperimentIdAsArr: any;

  private originUrl = '';
  private fullUrl = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private ioGardenService: IoGardenService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
/*     this.route.params.subscribe(params => {
      this.currExperimentId = params['id']
      this.currexperimentMetaData = this.ioGardenService.getIoGardenMetaDataById(this.currExperimentId);
      this.currExperimentIdAsArr = this.currexperimentMetaData.id.split('');
    }); */

    this.extractIdFromUrl()
    this.getExperimentMetaDataAndIdAsArr();
    console.log('this.currexperimentMetaData: ', this.currexperimentMetaData);

    this.subscriptions.add(
      this.dataService.originOfNavigation$.subscribe(origin => this.originUrl = origin)
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  public handleBackBtn() {
    const currPath = `/${this.originUrl}`;
    this.router.navigate([currPath]);
    /* console.log('this.originUrl: ', this.originUrl)
    if (this.originUrl === '') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/io-garden']);
    } */
  }

  private extractIdFromUrl(): void {
    this.fullUrl = this.router.url;
    const urlAsArr = this.fullUrl.split('/')
    this.currExperimentId = urlAsArr[urlAsArr.length - 1];
  }

  private getExperimentMetaDataAndIdAsArr(): void {
    this.currexperimentMetaData = this.ioGardenService.getIoGardenMetaDataById(this.currExperimentId);
    this.currExperimentIdAsArr = this.currexperimentMetaData.id.split('');
  }


}
