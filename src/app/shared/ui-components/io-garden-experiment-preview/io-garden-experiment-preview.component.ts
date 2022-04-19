import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';

import { IoGardenExperimentMetaData, IoGardenService } from '../../services/io-garden-service/io-garden.service';

type ImgOrientation = 'top' | 'left' | 'right';

@Component({
  selector: 'app-io-garden-experiment-preview',
  templateUrl: './io-garden-experiment-preview.component.html',
  styleUrls: ['./io-garden-experiment-preview.component.scss']
})
export class IoGardenExperimentPreviewComponent implements OnInit {

  @Input() imgPosition: ImgOrientation = 'top';
  @Input() metaData!: IoGardenExperimentMetaData;

  public previewOrintationClass = '';


  constructor(
    private ioGardenService: IoGardenService,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // ToDo: Move this here and in blog-post-preview component into method on utilities service or similar
    switch (this.imgPosition) {
      case ('top'):
        this.previewOrintationClass = 'image-top-preview-card';
        break;
      case ('left'):
        this.previewOrintationClass = 'image-left-preview-card';
        break;
      case ('right'):
        this.previewOrintationClass = 'image-right-preview-card';
        break;
      default:
        this.previewOrintationClass = 'image-top-preview-card';
    }
  }

  public handleExperimentPreviewReadBtn(id: string): void {
    const originUrl: string = this.route.snapshot.url.join('');
    this.dataService.originOfNavigation$.next(originUrl);
    // this.router.navigate(['/io-garden', id, id]);
    this.router.navigate(['/io-garden/experiment', id]);
  }
}
