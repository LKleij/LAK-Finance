import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from './pages/auth/store/auth.actions';
import { AppReducer, AppState } from './store/app.reducer';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  storeSubscription: Subscription;
  isLoggedIn = false;

  constructor(private store: Store<AppReducer>) {
    this.storeSubscription = store.select('authReducer').subscribe(state => this.isLoggedIn = !!state.userSession)
  }

  ngOnInit() {
    if ('userSession' in localStorage)
      this.store.dispatch(AuthActions.RETRIEVE_USER_SESSION_FROM_LOCAL_STORAGE())
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
