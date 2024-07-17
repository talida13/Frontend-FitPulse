import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeachersComponent } from './add-edit-teachers.component';

describe('AddEditTeachersComponent', () => {
  let component: AddEditTeachersComponent;
  let fixture: ComponentFixture<AddEditTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AddEditTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
