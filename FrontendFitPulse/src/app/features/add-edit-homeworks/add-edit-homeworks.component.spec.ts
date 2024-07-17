import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHomeworksComponent } from './add-edit-homeworks.component';

describe('AddEditHomeworksComponent', () => {
  let component: AddEditHomeworksComponent;
  let fixture: ComponentFixture<AddEditHomeworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AddEditHomeworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
