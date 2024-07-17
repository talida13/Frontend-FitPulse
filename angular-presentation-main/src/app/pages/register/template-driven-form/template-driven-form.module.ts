import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateDrivenFormComponent } from './template-driven-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TemplateDrivenFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[TemplateDrivenFormComponent]
})
export class TemplateDrivenFormModule { }
