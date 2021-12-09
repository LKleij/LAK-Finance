import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing'

import { AuthComponent } from './auth.component';
import { AuthTypes } from './auth.constants';
import { initialState } from './store/auth.reducer';

const getCurrentNavigationProperties = {
  id: null,
  initialUrl: null,
  extractedUrl: null,
  trigger: null,
  previousNavigation: null,
  extras: null
}

describe('AuthComponent', () => {
  let component: AuthComponent,
    fixture: ComponentFixture<AuthComponent>,
    el: DebugElement,
    routerSpy: jasmine.SpyObj<Router>,
    store: MockStore;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation'])
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [provideMockStore({ initialState }), { provide: Router, useValue: routerSpy }],
      imports: [RouterTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  it('should create', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });


  it('should set authentication type to Signin by default page loading', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(routerSpy.getCurrentNavigation).toHaveBeenCalledTimes(1);
    expect(component.authType).toEqual(AuthTypes.SIGNIN);
  })

  it('should set authentication type to Signin when using navigation with state parameter signin', () => {
    routerSpy.getCurrentNavigation.and.returnValue({ ...getCurrentNavigationProperties, extras: { state: { authType: AuthTypes.SIGNIN } } })
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(routerSpy.getCurrentNavigation).toHaveBeenCalledTimes(1);
    expect(component.authType).toEqual(AuthTypes.SIGNIN);
  })

  it('should set authentication type to signup when using navigation with state parameter signup', () => {
    routerSpy.getCurrentNavigation.and.returnValue({ ...getCurrentNavigationProperties, extras: { state: { authType: AuthTypes.SIGNUP } } })
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(routerSpy.getCurrentNavigation).toHaveBeenCalledTimes(1);
    expect(component.authType).toEqual(AuthTypes.SIGNUP);
  })

  it('should set authentication type to retrieve password when onRetrievePassword method was called', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.onRetrievePassword()
    fixture.detectChanges();

    expect(component.authType).toEqual(AuthTypes.RETRIEVE_PASSWORD);
  })

  it('should generate sigin form when authentication type is signin (confirm email and confirm passwords fiels must be disabled)', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    component.authType = AuthTypes.SIGNIN;
    fixture.detectChanges();

    expect(component.authType).toEqual(AuthTypes.SIGNIN);
    expect(component.authForm.get('email').status).not.toEqual('DISABLED')
    expect(component.authForm.get('emailConfirm').status).toEqual('DISABLED')
    expect(component.authForm.get('password').status).not.toEqual('DISABLED')
    expect(component.authForm.get('passwordConfirm').status).toEqual('DISABLED')
  })

  it('should generate signup form when authentication type is signup (no fields are disabled)', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    component.authType = AuthTypes.SIGNUP;
    fixture.detectChanges();

    expect(component.authType).toEqual(AuthTypes.SIGNUP);
    expect(component.authForm.get('email').status).not.toEqual('DISABLED')
    expect(component.authForm.get('emailConfirm').status).not.toEqual('DISABLED')
    expect(component.authForm.get('password').status).not.toEqual('DISABLED')
    expect(component.authForm.get('passwordConfirm').status).not.toEqual('DISABLED')
  })

  it('should generate retrieve password form when authentication type is retrieve password (all fields except email are disabled)', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    component.authType = AuthTypes.RETRIEVE_PASSWORD
    fixture.detectChanges();

    expect(component.authType).toEqual(AuthTypes.RETRIEVE_PASSWORD);
    expect(component.authForm.get('email').status).not.toEqual('DISABLED')
    expect(component.authForm.get('emailConfirm').status).toEqual('DISABLED')
    expect(component.authForm.get('password').status).toEqual('DISABLED')
    expect(component.authForm.get('passwordConfirm').status).toEqual('DISABLED')
  })


  it('should display retrieve password form when authentication type is retrieve password (all fields except email are disabled)', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.authType = AuthTypes.RETRIEVE_PASSWORD
    fixture.detectChanges();

    expect(component.authType).toEqual(AuthTypes.RETRIEVE_PASSWORD);
    expect(el.query(By.css('#email'))).toBeTruthy();
    expect(el.query(By.css('#emailConfirm'))).toBeFalsy();
    expect(el.query(By.css('#password'))).toBeFalsy();
    expect(el.query(By.css('#passwordConfirm'))).toBeFalsy();
  })

  it('should display signin form when authentication type is signin (confirm email and confirm password are disabled)', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.authType = AuthTypes.SIGNIN
    fixture.detectChanges();

    expect(component.authType).toEqual(AuthTypes.SIGNIN);
    expect(el.query(By.css('#email'))).toBeTruthy();
    expect(el.query(By.css('#emailConfirm'))).toBeFalsy();
    expect(el.query(By.css('#password'))).toBeTruthy();
    expect(el.query(By.css('#passwordConfirm'))).toBeFalsy();
  })

  it('should display signup form when authentication type is signup (no fields are disabled)', () => {
    routerSpy.getCurrentNavigation.and.returnValue(getCurrentNavigationProperties)
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.authType = AuthTypes.SIGNUP
    fixture.detectChanges();

    expect(component.authType).toEqual(AuthTypes.SIGNUP);
    expect(el.query(By.css('#email'))).toBeTruthy();
    expect(el.query(By.css('#emailConfirm'))).toBeTruthy();
    expect(el.query(By.css('#password'))).toBeTruthy();
    expect(el.query(By.css('#passwordConfirm'))).toBeTruthy();
  })

});
