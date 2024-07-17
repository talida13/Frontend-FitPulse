import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './forbidden.component';

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule
  ],
  exports: [ForbiddenComponent]
})
export class ForbiddenModule { }
