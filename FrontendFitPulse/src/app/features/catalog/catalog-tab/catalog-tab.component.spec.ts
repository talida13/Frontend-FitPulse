import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogTabComponent } from './catalog-tab.component';

describe('CatalogTabComponent', () => {
  let component: CatalogTabComponent;
  let fixture: ComponentFixture<CatalogTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CatalogTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
