import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogTabComponent } from './catalog/catalog-tab/catalog-tab.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AddEditLabsComponent } from './add-edit-labs/add-edit-labs.component';
import { AddEditTeachersComponent } from './add-edit-teachers/add-edit-teachers.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeworksComponent } from './homeworks/homeworks.component';
import { CoursesTabComponent } from './courses/courses-tab/courses-tab.component';
import { HomeworkTabComponent } from './homeworks/homework-tab/homework-tab.component';
import { AddEditCoursesComponent } from './add-edit-courses/add-edit-courses.component';
import { AddEditHomeworksComponent } from './add-edit-homeworks/add-edit-homeworks.component';
import { ViewGradesDialogComponent } from './dialogs/view-grades-dialog/view-grades-dialog.component';
import { AddEditStudentsComponent } from './add-edit-students/add-edit-students.component';

@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginFormComponent,
    CatalogComponent,
    CatalogTabComponent,
    TeachersComponent,
    AddEditLabsComponent,
    AddEditTeachersComponent,
    WelcomePageComponent,
    CoursesComponent,
    HomeworksComponent,
    CoursesTabComponent,
    HomeworkTabComponent,
    AddEditCoursesComponent,
    AddEditHomeworksComponent,
    ViewGradesDialogComponent,
    AddEditStudentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    RegisterFormComponent,
    LoginFormComponent,
    CatalogComponent,
    TeachersComponent,
    AddEditLabsComponent,
    AddEditTeachersComponent,
    AddEditCoursesComponent,
    AddEditHomeworksComponent
  ],
  providers: [HttpClient, FormBuilder]
})
export class FeaturesModule { }
