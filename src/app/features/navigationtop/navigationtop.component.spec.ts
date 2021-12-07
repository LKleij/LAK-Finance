import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { IndexComponent } from 'src/app/pages/index/index.component';

import { NavigationtopComponent } from './navigationtop.component';

describe('NavigationtopComponent', () => {
  let component: NavigationtopComponent;
  let fixture: ComponentFixture<NavigationtopComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationtopComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: '', component: IndexComponent },
          { path: 'auth', component: AuthComponent }]
        )
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationtopComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toAuthPage once on signin click', () => {
    const onClickMock = spyOn(component, 'toAuthPage')
    fixture.debugElement.query(By.css('.btn-signin')).triggerEventHandler('click', null)
    expect(onClickMock).toHaveBeenCalledTimes(1);
  })

  it('should call toAuthPage once on signup click', () => {
    const onClickMock = spyOn(component, 'toAuthPage');
    fixture.debugElement.query(By.css('.btn-signup')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('toAuthPage with signin param should redirect to signin page', () => {

    pending();

  })
});
