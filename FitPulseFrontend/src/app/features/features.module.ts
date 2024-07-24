import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    WorkoutsComponent,
    AboutUsComponent,
    AdminComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
