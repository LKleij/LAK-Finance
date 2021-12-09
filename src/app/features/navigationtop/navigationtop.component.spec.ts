import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { IndexComponent } from 'src/app/pages/index/index.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing'

import { NavigationtopComponent } from './navigationtop.component';
import { initialState } from '../../pages/auth/store/auth.reducer'
import { DebugElement } from '@angular/core';

describe('NavigationtopComponent', () => {
  let component: NavigationtopComponent;
  let fixture: ComponentFixture<NavigationtopComponent>;
  let router: Router;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationtopComponent],
      providers: [provideMockStore({ initialState })],
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

  it('should display signin and create account buttons when user is not signed in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement;

    expect(el.query(By.css('#signin'))).toBeTruthy();
    expect(el.query(By.css('#signup'))).toBeTruthy()
  })

  it('should call toAuthPage once on signin click', () => {
    const onClickMock = spyOn(component, 'toAuthPage')
    fixture.debugElement.query(By.css('#signin')).triggerEventHandler('click', null)
    expect(onClickMock).toHaveBeenCalledTimes(1);
  })

  it('should call toAuthPage once on signup click', () => {
    const onClickMock = spyOn(component, 'toAuthPage');
    fixture.debugElement.query(By.css('#signup')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not display signin and create account buttons when user is signed in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement;

    expect(el.query(By.css('#signin'))).toBeFalsy();
    expect(el.query(By.css('#signup'))).toBeFalsy()
  })

});
