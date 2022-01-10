import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IoGardenExperimentMetaData, IoGardenService } from '../../services/io-garden-service/io-garden.service';

type ImgOrientation = 'top' | 'left' | 'right';

@Component({
  selector: 'app-io-garden-experiment-preview',
  templateUrl: './io-garden-experiment-preview.component.html',
  styleUrls: ['./io-garden-experiment-preview.component.scss']
})
export class IoGardenExperimentPreviewComponent implements OnInit {

  @Input() imgPosition: ImgOrientation = 'top';
  @Input() metaData: IoGardenExperimentMetaData = {
    'id': '',
    'title': '',
    'subtitle': '',
    'abstract': '',
    'descriptionUrl': '',
    'dateOriginal': '',
    'dateLastEdited': '',
    'state': 0,
    'selector': '',
    'previewImageUrl': '',
    'tags': []
  };

  public previewOrintationClass = '';


  constructor(
    private ioGardenService: IoGardenService,
    private router: Router
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
    this.router.navigate(['/io-garden', id, id]);
  }
}
