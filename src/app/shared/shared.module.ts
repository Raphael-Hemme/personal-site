import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';


import { P5SketchContainerComponent } from './components/p5-sketch-container/p5-sketch-container.component';
import { ProfilePhotoSketchComponent } from './components/profile-photo-sketch/profile-photo-sketch.component';
import { HorizontalGlitchSketchComponent } from './components/horizontal-glitch-sketch/horizontal-glitch-sketch.component';
import { IoGardenExperimentPreviewComponent } from './ui-components/io-garden-experiment-preview/io-garden-experiment-preview.component';
import { IoGardenExperimentContainerComponent } from './ui-components/io-garden-experiment-container/io-garden-experiment-container.component';

import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    P5SketchContainerComponent,
    ProfilePhotoSketchComponent,
    HorizontalGlitchSketchComponent,
    IoGardenExperimentPreviewComponent,
    IoGardenExperimentContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MarkdownModule
  ],
  exports: [
    P5SketchContainerComponent,
    ProfilePhotoSketchComponent,
    HorizontalGlitchSketchComponent,
    IoGardenExperimentPreviewComponent
  ]
})
export class SharedModule { }
