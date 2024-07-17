import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CourseDto } from 'src/app/core/models/course-dto.model';
import { Course } from 'src/app/core/models/course.model';
import { CoursesService } from 'src/app/core/services/course.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-add-edit-courses',
  templateUrl: './add-edit-courses.component.html',
  styleUrls: ['./add-edit-courses.component.scss']
})
export class AddEditCoursesComponent extends BaseConfigurationComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  formGroupArray: FormGroup[] = [];
  addFormGroup: FormGroup;
  courseDto: CourseDto;
  courses: Course[] = [];
  courseTitle: string;
  coursesIndex: string[] = [];
  constructor(
    private readonly coursesService: CoursesService,
    tenantService: TenantService
  ) {
    super(tenantService);
  }

  async ngOnInit(): Promise<void> {
    this.courseTitle = this.tenant.courseTitle;
    this.addFormGroup = this.initializeFormGroup();
    await this.getCourses();
  }

  initializeFormGroup(): FormGroup {
    const maxValueForYear = Number(this.tenant.numberOfYears);
    return new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.max(maxValueForYear)]),
      semester: new FormControl('', [Validators.required, Validators.max(2)])
    });
  }

  submitEdit(index: number): void {
    this.courseDto = this.formGroupArray[index].getRawValue();
    this.coursesService
      .updateCourse(this.courses[index].id, this.courseDto)
      .subscribe((course: Course) => {
        this.courses[index] = course;
      });
  }
  submitAdd(): void {
    this.courseDto = this.addFormGroup.getRawValue();
    this.coursesService
      .createCourse(this.courseDto)
      .subscribe((course: Course) => {
        this.courses.push(course);
        this.formGroupArray.push(this.initializeFormGroup());
        this.coursesIndex.push(`Week ${this.courses.indexOf(course) + 1}`)
      });
  }

  deleteLab(course: Course): void {
    this.coursesService.deleteCourse(course.id).subscribe();
    const index = this.courses.indexOf(course);
    this.courses.splice(index, 1);
    this.formGroupArray.splice(index, 1);
    this.coursesIndex.splice(index, 1);
  }

  private async getCourses(): Promise<void> {
    this.coursesService.getCourses().subscribe((data: Course[]) => {
      for (const course of data) {
        this.courses.push(course);
        this.formGroupArray.push(this.initializeFormGroup());
        this.coursesIndex.push(`Week ${data.indexOf(course) + 1}`)
      }
    });
  }

}
