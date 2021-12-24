import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

/* import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"; */


import { P5SketchContainerComponent } from './components/p5-sketch-container/p5-sketch-container.component';
import { ProfilePhotoSketchComponent } from './components/profile-photo-sketch/profile-photo-sketch.component';
import { HorizontalGlitchSketchComponent } from './components/horizontal-glitch-sketch/horizontal-glitch-sketch.component';
import { IoGardenExperimentPreviewComponent } from './ui-components/io-garden-experiment-preview/io-garden-experiment-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { IoGardenExperimentContainerComponent } from './ui-components/io-garden-experiment-container/io-garden-experiment-container.component';



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
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
  ],
  exports: [
    P5SketchContainerComponent,
    ProfilePhotoSketchComponent,
    HorizontalGlitchSketchComponent,
    IoGardenExperimentPreviewComponent
  ]
})
export class SharedModule { }
