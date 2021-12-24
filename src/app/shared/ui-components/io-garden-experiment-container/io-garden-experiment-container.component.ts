import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  public currexperimentMetaData: IoGardenExperimentMetaData = {
    'id': '',
    'title': '',
    'subtitle': '',
    'abstract': '',
    'dateOriginal': '',
    'dateLastEdited': '',
    'state': 0,
    'selector': '',
    'previewImageUrl': '',
    'tags': []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ioGardenService: IoGardenService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currExperimentId = params['id']
      this.currexperimentMetaData = this.ioGardenService.getBlogPostMetaDataById(this.currExperimentId);
    });
  }

  public handleReturnToExperimentSelectionBtn() {
    this.router.navigate(['/io-garden']);
  }

}
