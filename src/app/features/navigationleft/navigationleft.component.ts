import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppReducer } from 'src/app/store/app.reducer';
import * as AuthActions from "../../pages/auth/store/auth.actions"

@Component({
  selector: 'app-navigationleft',
  templateUrl: './navigationleft.component.html',
  styleUrls: ['./navigationleft.component.css']
})
export class NavigationleftComponent implements OnInit {
  selectedTab: number = 0;

  constructor(private store: Store<AppReducer>) { }

  ngOnInit(): void {
    this.onSelect(2); // The second tab is selected by default
  }

  onLogout() {
    this.store.dispatch(AuthActions.LOGOUT_USER())
  }

  onSelect(num: number) {
    this.selectedTab = num;
  }

}
