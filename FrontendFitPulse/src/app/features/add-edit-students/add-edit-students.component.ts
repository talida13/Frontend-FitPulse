import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { StudentDto } from 'src/app/core/models/student-dto.model';
import { Student } from 'src/app/core/models/student.model';
import { StudentsService } from 'src/app/core/services/students.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-add-edit-students',
  templateUrl: './add-edit-students.component.html',
  styleUrls: ['./add-edit-students.component.scss']
})
export class AddEditStudentsComponent extends BaseConfigurationComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  formGroupArray: FormGroup[] = [];
  addFormGroup: FormGroup;
  studentDto: StudentDto;
  students: Student[] = [];
  courseTitle: string;
  constructor(
    private readonly studentsService: StudentsService,
    tenantService: TenantService
  ) {
    super(tenantService);
  }

  async ngOnInit(): Promise<void> {
    this.courseTitle = this.tenant.courseTitle;
    this.addFormGroup = this.initializeFormGroup();
    await this.getStudents();
  }

  initializeFormGroup(): FormGroup {
    return new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      year: new FormControl('', Validators.required),
      identificationNumber: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required)
    });
  }

  submitEdit(index: number): void {
    this.studentDto = this.formGroupArray[index].getRawValue();
    this.studentsService
      .updateStudent(this.students[index].id, this.studentDto)
      .subscribe((student: Student) => {
        this.students[index] = student;
      });
  }
  submitAdd(): void {
    this.studentDto = this.addFormGroup.getRawValue();
    this.studentsService
      .createStudent(this.studentDto)
      .subscribe((student: Student) => {
        this.students.push(student);
        this.formGroupArray.push(this.initializeFormGroup());
      });
  }

  deleteLab(student: Student): void {
    this.studentsService.deleteStudent(student.id).subscribe();
    const index = this.students.indexOf(student);
    this.students.splice(index, 1);
    this.formGroupArray.splice(index, 1);
  }

  private async getStudents(): Promise<void> {
    this.studentsService.getStudents().subscribe((data: Student[]) => {
      for (const student of data) {
        this.students.push(student);
        this.formGroupArray.push(this.initializeFormGroup());
      }
    });
  }


}
