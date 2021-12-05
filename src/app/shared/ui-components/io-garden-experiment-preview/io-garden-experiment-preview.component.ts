import { Component, Input, OnInit } from '@angular/core';

type ImgOrientation = 'top' | 'down' | 'left' | 'right';

@Component({
  selector: 'app-io-garden-experiment-preview',
  templateUrl: './io-garden-experiment-preview.component.html',
  styleUrls: ['./io-garden-experiment-preview.component.scss']
})
export class IoGardenExperimentPreviewComponent implements OnInit {

  @Input() imageOrientation: ImgOrientation = 'top';

  constructor() { }

  ngOnInit(): void {}

}
