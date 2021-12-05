import { Component, Input, OnInit } from '@angular/core';

type ImgOrientation = 'top' | 'down' | 'left' | 'right';
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

  @Input() imageOrientation: ImgOrientation = 'top';
  @Input() experimentpreviewData: ExperimentPreviewData = {
    title: '',
    subtitle: '',
    abstract: '',
    phase: '',
    previewImgUrl: ''
  };

  constructor() { }

  ngOnInit(): void {}

}
