import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page/about-page.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    AboutPageComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AboutModule { }
