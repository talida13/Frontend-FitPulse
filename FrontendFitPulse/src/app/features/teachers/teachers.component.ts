import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/core/models/teacher.model';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent extends BaseConfigurationComponent implements OnInit {
  displayedColumns = ['position', 'fullName', 'role', 'cabinet', 'email', 'phoneNumber'];
  teachers: Teacher[] = [];
  dataSource: Teacher[];
  constructor(private readonly teachersService: TeachersService, tenantService: TenantService) {
    super(tenantService);
  }
  ngOnInit(): void {
    this.teachersService.getTeachers().subscribe((data: Teacher[]) => {
      console.log(data);
      for (const teacher of data) {
        this.teachers.push(teacher);
      }
      this.dataSource = this.teachers;
    });
  }
}
