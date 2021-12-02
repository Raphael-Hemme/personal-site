import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"; */
import { P5SketchContainerComponent } from './components/p5-sketch-container/p5-sketch-container.component';



@NgModule({
  declarations: [
    P5SketchContainerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    P5SketchContainerComponent
  ]
})
export class SharedModule { }
