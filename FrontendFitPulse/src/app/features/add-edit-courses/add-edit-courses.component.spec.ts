import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCoursesComponent } from './add-edit-courses.component';

describe('AddEditCoursesComponent', () => {
  let component: AddEditCoursesComponent;
  let fixture: ComponentFixture<AddEditCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AddEditCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
