import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthTypes } from 'src/app/pages/auth/auth.constants';
import { AppReducer } from 'src/app/store/app.reducer';
import * as AuthActions from '../../pages/auth/store/auth.actions'

@Component({
  selector: 'app-navigationtop',
  templateUrl: './navigationtop.component.html',
  styleUrls: ['./navigationtop.component.css']
})
export class NavigationtopComponent implements OnInit, OnDestroy {

  storeSubscription: Subscription;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private store: Store<AppReducer>
  ) {
    this.storeSubscription = store.select('authReducer').subscribe(state => this.isLoggedIn = !!state.userSession)
  }

  ngOnInit(): void {

  }

  toAuthPage(_authType: string) {
    let authType = (_authType == 'signup') ? AuthTypes.SIGNUP : AuthTypes.SIGNIN;

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['auth'], { state: { authType: authType } })
    })
  }


  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
