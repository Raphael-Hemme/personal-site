import { Component, Input, OnInit } from '@angular/core';

type ImgOrientation = 'top' | 'left' | 'right';
interface ExperimentPreviewData {
  title: string;
  subtitle: string;
  abstract: string;
  phase: string;
  previewImgUrl: string;
}

@Component({
  selector: 'app-io-garden-experiment-preview',
  templateUrl: './io-garden-experiment-preview.component.html',
  styleUrls: ['./io-garden-experiment-preview.component.scss']
})
export class IoGardenExperimentPreviewComponent implements OnInit {

  @Input() imgPosition: ImgOrientation = 'top';
  @Input() experimentpreviewData: ExperimentPreviewData = {
    title: '',
    subtitle: '',
    abstract: '',
    phase: '',
    previewImgUrl: ''
  };

  public previewOrintationClass = ''

  constructor() { }

  ngOnInit(): void {
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

}
