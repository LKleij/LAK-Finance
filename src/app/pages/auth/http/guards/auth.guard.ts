import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppReducer } from "src/app/store/app.reducer";

@Injectable()
export class AuthGuard implements CanActivate {
    isLoggedIn = false;

    constructor(private store: Store<AppReducer>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        this.store.select('authReducer').pipe(take(1)).subscribe(state => this.isLoggedIn = !!state.userSession);

        if (!this.isLoggedIn)
            this.router.navigate(['/auth'])


        return this.isLoggedIn
    }
}