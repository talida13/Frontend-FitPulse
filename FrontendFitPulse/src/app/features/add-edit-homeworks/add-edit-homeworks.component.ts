import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { HomeworkDto } from 'src/app/core/models/homework-dto.model';
import { Homework } from 'src/app/core/models/homework.model';
import { HomeworksService } from 'src/app/core/services/homework.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-add-edit-homeworks',
  templateUrl: './add-edit-homeworks.component.html',
  styleUrls: ['./add-edit-homeworks.component.scss']
})
export class AddEditHomeworksComponent extends BaseConfigurationComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  formGroupArray: FormGroup[] = [];
  addFormGroup: FormGroup;
  homeworkDto: HomeworkDto;
  homeworks: Homework[] = [];
  courseTitle: string;
  homeworksIndex: string[] = [];
  constructor(
    private readonly homeworksService: HomeworksService,
    tenantService: TenantService
  ) {
    super(tenantService);
  }

  async ngOnInit(): Promise<void> {
    this.courseTitle = this.tenant.courseTitle;
    this.addFormGroup = this.initializeFormGroup();
    await this.getHomeworks();
  }

  initializeFormGroup(): FormGroup {
    return new FormGroup({
      value: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      bonus: new FormControl('', Validators.required)
    });
  }

  submitEdit(index: number): void {
    this.homeworkDto = this.formGroupArray[index].getRawValue();
    console.log(this.homeworkDto)
    this.homeworksService
      .updateHomework(this.homeworks[index].id, this.homeworkDto)
      .subscribe((homework: Homework) => {
        this.homeworks[index] = homework;
      });
  }
  submitAdd(): void {
    this.homeworkDto = this.addFormGroup.getRawValue();
    this.homeworksService
      .createHomework(this.homeworkDto)
      .subscribe((homework: Homework) => {
        this.homeworks.push(homework);
        this.formGroupArray.push(this.initializeFormGroup());
        this.homeworksIndex.push(`Week ${this.homeworks.indexOf(homework) + 1}`)
      });
  }

  deleteLab(homework: Homework): void {
    this.homeworksService.deleteHomework(homework.id).subscribe();
    const index = this.homeworks.indexOf(homework);
    this.homeworks.splice(index, 1);
    this.formGroupArray.splice(index, 1);
    this.homeworksIndex.splice(index, 1);
  }

  private async getHomeworks(): Promise<void> {
    this.homeworksService.getHomeworks().subscribe((data: Homework[]) => {
      for (const homework of data) {
        this.homeworks.push(homework);
        this.formGroupArray.push(this.initializeFormGroup());
        this.homeworksIndex.push(`Week ${data.indexOf(homework) + 1}`)
      }
    });
  }

}
