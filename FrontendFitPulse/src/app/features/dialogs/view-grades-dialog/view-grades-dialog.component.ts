import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/core/models/reports.model';
import { ReportsService } from 'src/app/core/services/reports.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-view-grades-dialog',
  templateUrl: './view-grades-dialog.component.html',
  styleUrls: ['./view-grades-dialog.component.scss']
})
export class ViewGradesDialogComponent extends BaseConfigurationComponent implements OnInit {
  displayedColumns = ['position', 'student', 'value', 'evaluationType'];
  reports: Report[] = [];
  dataSource: Report[];
  constructor(private readonly reportsService: ReportsService, tenantService: TenantService) {
    super(tenantService);
  }
  ngOnInit(): void {
    this.reportsService.getReports().subscribe((data: Report[]) => {
      for (const report of data) {
        this.reports.push(report);
      }
      this.dataSource = this.reports;
    });
  }
}
