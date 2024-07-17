import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { TeacherDto } from 'src/app/core/models/teacher-dto.model';
import { Teacher } from 'src/app/core/models/teacher.model';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-add-edit-teachers',
  templateUrl: './add-edit-teachers.component.html',
  styleUrls: ['./add-edit-teachers.component.scss'],
})
export class AddEditTeachersComponent
  extends BaseConfigurationComponent
  implements OnInit
{
  @ViewChild(MatAccordion) accordion: MatAccordion;
  formGroupArray: FormGroup[] = [];
  addFormGroup: FormGroup;
  teacherDto: TeacherDto;
  teachers: Teacher[] = [];
  courseTitle: string;
  constructor(
    private readonly teacherService: TeachersService,
    tenantService: TenantService
  ) {
    super(tenantService);
  }

  async ngOnInit(): Promise<void> {
    this.courseTitle = this.tenant.courseTitle;
    this.addFormGroup = this.initializeFormGroup();
    await this.getTeachers();
  }

  initializeFormGroup(): FormGroup {
    return new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      cabinet: new FormControl('', Validators.required)
    });
  }

  submitEdit(index: number): void {
    this.teacherDto = this.formGroupArray[index].getRawValue();
    this.teacherService
      .updateTeacher(this.teachers[index].id, this.teacherDto)
      .subscribe((teacher: Teacher) => {
        this.teachers[index] = teacher;
      });
  }
  submitAdd(): void {
    this.teacherDto = this.addFormGroup.getRawValue();
    this.teacherService
      .createTeacher(this.teacherDto)
      .subscribe((teacher: Teacher) => {
        this.teachers.push(teacher);
        this.formGroupArray.push(this.initializeFormGroup());
      });
  }

  deleteLab(teacher: Teacher): void {
    this.teacherService.deleteTeacher(teacher.id).subscribe();
    const index = this.teachers.indexOf(teacher);
    this.teachers.splice(index, 1);
    this.formGroupArray.splice(index, 1);
  }

  private async getTeachers(): Promise<void> {
    this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
      for (const teacher of data) {
        this.teachers.push(teacher);
        this.formGroupArray.push(this.initializeFormGroup());
      }
    });
  }
}
