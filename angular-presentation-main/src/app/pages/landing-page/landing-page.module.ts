import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule
  ],
  exports: [LandingPageComponent]
})
export class LandingPageModule { }
