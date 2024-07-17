import { Component } from '@angular/core';
import { Tile } from 'src/app/core/models/tile.model';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent extends BaseConfigurationComponent {
  courseTitle: string;
  welcomePageText = `Welcome to ${this.tenant.courseTitle} Course Website!\n Here you can see the courses, labs, homeworks and your grades!
  This course has ${this.tenant.credits} credits. Final grade formula is ${this.tenant.finalGradeFormula}!`;
  tiles: Tile[] = [
    {text: this.welcomePageText, cols: 2, rows: 4},
    {text: '', cols: 2, rows: 1},
    {text: '', cols: 2, rows: 4},
  ];

}
