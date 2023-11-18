import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { HorizontalGlitchSketchComponent } from './components/horizontal-glitch-sketch/horizontal-glitch-sketch.component';
// import { IoGardenExperimentPreviewComponent } from './ui-components/io-garden-experiment-preview/io-garden-experiment-preview.component';
import { IoGardenExperimentContainerComponent } from './ui-components/io-garden-experiment-container/io-garden-experiment-container.component';

import { MarkdownModule } from 'ngx-markdown';
import { TagListComponent } from './ui-components/tag-list/tag-list.component';
import { SiteMenuComponent } from './ui-components/site-menu/site-menu.component';
import { ModalComponent } from './ui-components/modal/modal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    HorizontalGlitchSketchComponent,
    // IoGardenExperimentPreviewComponent,
    IoGardenExperimentContainerComponent,
    TagListComponent,
    SiteMenuComponent,
    ModalComponent,
    PageNotFoundComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MarkdownModule,
    FormsModule
  ],
  exports: [
    HorizontalGlitchSketchComponent,
    // IoGardenExperimentPreviewComponent,
    IoGardenExperimentContainerComponent,
    TagListComponent,
    SiteMenuComponent,
    ModalComponent,
    SearchComponent,
  ]
})
export class SharedModule { }
