import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthTypes } from './auth.constants';
import { CustomValidators } from './validators/auth.validators';
import * as AuthActions from './store/auth.actions'
import { AppReducer } from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  subscriptionStore: Subscription;
  authType: AuthTypes = AuthTypes.SIGNIN;
  authForm: FormGroup;
  currentFocus: string = '';
  authError: { errorMessage: string, errorDescription: string } = null;

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if (this.authError)
      this.resolveError();
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppReducer>) {

    this.subscriptionStore = store.select('authReducer').subscribe(state => this.authError = state.authError)

    const currentNavigation = this.router.getCurrentNavigation()

    if (currentNavigation.extras && currentNavigation.extras.state && currentNavigation.extras.state.authType) {
      this.authType = currentNavigation.extras.state.authType;
    }
  }

  ngOnInit(): void {
    this.generateForm();


    document.addEventListener('focus', (event: Event) => {
      const eventTarget: Element = event.target as Element;
      this.currentFocus = eventTarget.id;
    }, true)
    document.addEventListener('focusout', (event: Event) => {
      const eventTarget: Element = event.target as Element;
      this.currentFocus = null;
    }, true)
  }

  onSubmit() {
    if (!this.authForm.valid)
      return;

    const userInfo = {
      email: (this.formEmail.value as string).toLowerCase(),
      password: this.formPassword.value as string
    }

    if (this.isSigninForm)
      this.store.dispatch(AuthActions.USER_AUTHENTICATE_SIGNIN(userInfo))
    else if (this.isSignupForm)
      this.store.dispatch(AuthActions.USER_AUTHENTICATE_SIGNUP(userInfo))
    else if (this.isRetrievePasswordForm) {
      // not handled yet
    }
  }

  generateForm() {
    this.authForm = this.formBuilder.group({
      email: ['',
        [Validators.required, Validators.email]
      ],
      emailConfirm: [
        { value: '', disabled: !this.isSignupForm },
        [Validators.required, Validators.email]
      ],
      password: [
        { value: '', disabled: this.isRetrievePasswordForm },
        [Validators.required, Validators.minLength(6)]
      ],
      passwordConfirm: [
        { value: '', disabled: !this.isSignupForm },
        [Validators.required, Validators.minLength(6)]
      ]
    }, {
      validators: [
        CustomValidators.validateEmails(this.isSignupForm),
        CustomValidators.validatePasswords(this.isSignupForm)
      ]
    })
  }

  onRetrievePassword() {
    this.authType = AuthTypes.RETRIEVE_PASSWORD;
    this.generateForm();
  }

  resolveError() {
    this.store.dispatch(AuthActions.RESOLVE_AUTH_ERROR());
  }


  get isFocusedEmail() {
    return this.currentFocus == 'email';
  }

  get isFocusedEmailConfirm() {
    return this.currentFocus == 'emailConfirm';
  }

  get isFocusedPassword() {
    return this.currentFocus == 'password';
  }

  get isFocusedPasswordConfirm() {
    return this.currentFocus == 'passwordConfirm';
  }

  get formEmail() {
    return this.authForm.get('email')
  }

  get formEmailConfirm() {
    return this.authForm.get('emailConfirm')
  }

  get formPassword() {
    return this.authForm.get('password')
  }

  get formPasswordConfirm() {
    return this.authForm.get('passwordConfirm')
  }

  get formEmailErrors() {
    if (this.authForm.errors && this.authForm.errors.emailsNotEqual)
      return this.authForm.errors.emailsNotEqual
  }

  get formPasswordErrors() {
    if (this.authForm.errors && this.authForm.errors.passwordsNotEqual)
      return this.authForm.errors.passwordsNotEqual
  }

  get isSignupForm() {
    return this.authType == AuthTypes.SIGNUP;
  }

  get isSigninForm() {
    return this.authType == AuthTypes.SIGNIN;
  }
  get isRetrievePasswordForm() {
    return this.authType == AuthTypes.RETRIEVE_PASSWORD;
  }

  get getFormTitle() {
    if (this.isSigninForm)
      return 'Sign in to your account';
    else if (this.isSignupForm)
      return 'Create your account';
    else if (this.isRetrievePasswordForm)
      return 'Reset your password';
  }

  get getFormButtonText() {
    if (this.isSigninForm)
      return 'Sign in';
    else if (this.isSignupForm)
      return 'Create account';
    else if (this.isRetrievePasswordForm)
      return 'Reset password';
  }
}
