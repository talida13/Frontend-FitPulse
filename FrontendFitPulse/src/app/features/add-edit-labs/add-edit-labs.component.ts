import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { LabDto } from 'src/app/core/models/lab-dto.model';
import { Lab } from 'src/app/core/models/lab.model';
import { Teacher } from 'src/app/core/models/teacher.model';
import { LabsService } from 'src/app/core/services/labs.service';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-add-edit-labs',
  templateUrl: './add-edit-labs.component.html',
  styleUrls: ['./add-edit-labs.component.scss'],
})
export class AddEditLabsComponent
  extends BaseConfigurationComponent
  implements OnInit
{
  @ViewChild(MatAccordion) accordion: MatAccordion;
  labs: Lab[] = [];
  formGroupArray: FormGroup[] = [];
  addFormGroup: FormGroup;
  labDto: LabDto;
  teachers: Teacher[] = [];
  courseTitle: string;
  constructor(
    private readonly labsService: LabsService,
    private readonly teacherService: TeachersService,
    tenantService: TenantService
  ) {
    super(tenantService);
  }

  async ngOnInit(): Promise<void> {
    this.courseTitle = this.tenant.courseTitle;
    this.addFormGroup = this.initializeFormGroup();
    await this.getLabs();
    await this.getTeachers();
  }

  initializeFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      semester: new FormControl('', Validators.required),
      teacherId: new FormControl('', Validators.required),
    });
  }

  submitEdit(index: number): void {
    this.labDto = this.formGroupArray[index].getRawValue();
    this.labsService
      .updateLab(this.labs[index].id, this.labDto)
      .subscribe((lab: Lab) => {
        this.labs[index] = lab;
      });
  }
  submitAdd(): void {
    this.labDto = this.addFormGroup.getRawValue();
    this.labsService.createLab(this.labDto).subscribe((lab: Lab) => {
      this.labs.push(lab);
      this.formGroupArray.push(this.initializeFormGroup());
    });
  }

  deleteLab(lab: Lab): void {
    this.labsService.deleteLab(lab.id).subscribe();
    const index = this.labs.indexOf(lab);
    this.labs.splice(index, 1);
    this.formGroupArray.splice(index, 1);
  }

  private async getLabs(): Promise<void> {
    this.labs = [];
    this.formGroupArray = [];
    this.labsService.getLabs().subscribe((data: Lab[]) => {
      for (const lab of data) {
        this.labs.push(lab);
        this.formGroupArray.push(this.initializeFormGroup());
      }
    });
  }

  private async getTeachers(): Promise<void> {
    this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
      for (const teacher of data) {
        this.teachers.push(teacher);
      }
    });
  }
}
