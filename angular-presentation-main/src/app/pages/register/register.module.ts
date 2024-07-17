import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormModule } from './reactive-form/reactive-form.module';
import { TemplateDrivenFormModule } from './template-driven-form/template-driven-form.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormModule,
    TemplateDrivenFormModule,
  ],
  exports:[RegisterComponent]
})
export class RegisterModule { }
