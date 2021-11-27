import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMainComponent } from './ui-components/ui-main/ui-main.component';
import { UiNavigationComponent } from './ui-components/ui-navigation/ui-navigation.component';
import { UiHeaderComponent } from './ui-components/ui-header/ui-header.component';



@NgModule({
  declarations: [
    UiMainComponent,
    UiNavigationComponent,
    UiHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UiMainComponent,
    UiNavigationComponent,
    UiHeaderComponent
  ]
})
export class SharedModule { }
