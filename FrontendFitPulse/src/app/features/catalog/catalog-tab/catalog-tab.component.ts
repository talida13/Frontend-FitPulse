import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/core/models/student.model';
import { StudentsService } from 'src/app/core/services/students.service';
import { environment } from 'src/environments/environment';
import { ViewGradesDialogComponent } from '../../dialogs/view-grades-dialog/view-grades-dialog.component';

@Component({
  selector: 'app-catalog-tab',
  templateUrl: './catalog-tab.component.html',
  styleUrls: ['./catalog-tab.component.scss']
})
export class CatalogTabComponent implements OnInit{
  @Input() students: Student[];
  displayedColumns = ['position', 'name', 'year', 'identificationNumber', 'options'];
  dataSource: Student[];
  isAdminOn: boolean;

  constructor(public dialog: MatDialog, private readonly studentService: StudentsService){}

  ngOnInit(): void {
    this.dataSource = this.students;
    this.isAdminOn = environment.isAdminOn;
  }

  openGradesDialog(): void {
    this.dialog.open(ViewGradesDialogComponent);
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student.id).subscribe();
    const index = this.students.indexOf(student);
    this.students.splice(index, 1);
  }
}
