import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';

import { IoGardenExperimentMetaData, IoGardenService } from '../../services/io-garden-service/io-garden.service';

@Component({
  selector: 'app-io-garden-experiment-container',
  templateUrl: './io-garden-experiment-container.component.html',
  styleUrls: ['./io-garden-experiment-container.component.scss']
})
export class IoGardenExperimentContainerComponent implements OnInit {

  // public experiment: any;
  public currExperiment: any;
  public currExperimentId: string = '';
  public currexperimentMetaData!: IoGardenExperimentMetaData;
  public currExperimentIdAsArr: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ioGardenService: IoGardenService,
    private dataService: DataService
  ) { }

  private originUrl = ''

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currExperimentId = params['id']
      this.currexperimentMetaData = this.ioGardenService.getIoGardenMetaDataById(this.currExperimentId);
      this.currExperimentIdAsArr = this.currexperimentMetaData.id.split('');
    });
    this.dataService.originOfNavigation$.subscribe(origin => this.originUrl = origin)
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

}
