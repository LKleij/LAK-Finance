import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationleftComponent } from './navigationleft.component';

describe('NavigationleftComponent', () => {
  let component: NavigationleftComponent;
  let fixture: ComponentFixture<NavigationleftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationleftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
