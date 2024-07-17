import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuContentComponent } from './navigation-menu-content.component';

describe('NavigationMenuContentComponent', () => {
  let component: NavigationMenuContentComponent;
  let fixture: ComponentFixture<NavigationMenuContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationMenuContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
