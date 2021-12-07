import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions"
import { catchError, concatMap, mergeMap, take, tap } from "rxjs/operators"
import { AuthHttpService } from "../auth.service";
import { of } from "rxjs";
import { AuthResponseData } from "../models/auth-response.model";
import { Store } from "@ngrx/store";
import { AppReducer } from "src/app/store/app.reducer";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthEffects {

    postUserRegistration = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.USER_AUTHENTICATE_SIGNIN, AuthActions.USER_AUTHENTICATE_SIGNUP),
        mergeMap(payload => {
            return (payload.type == AuthActions.USER_AUTHENTICATE_SIGNIN.type ?
                this.authHttpService.signinUser(payload.email, payload.password) :
                this.authHttpService.signupUser(payload.email, payload.password)
            ).pipe(
                concatMap((responseData: AuthResponseData) => {
                    let tokenExpirationDate = getDlateWithOffset(+responseData.expiresIn);
                    return [
                        AuthActions.SET_USER_SESSION({
                            email: responseData.email,
                            idToken: responseData.idToken,
                            tokenExpirationDate: tokenExpirationDate
                        }),
                        AuthActions.UPDATE_LOCAL_STORAGE()
                    ]
                }),
                catchError((err: HttpErrorResponse) => of(AuthActions.USER_AUTHENTICATE_FAIL({ error: err })))
            )
        })
    ))

    retrieveUserSessionFromLocalStorage = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.RETRIEVE_USER_SESSION_FROM_LOCAL_STORAGE),
        mergeMap(() => {
            let userSession: AuthActions.UserSessionData = JSON.parse(localStorage.getItem('userSession'));
            let tokenExpirationDate = new Date(userSession.tokenExpirationDate);

            if (tokenExpirationDate > new Date()) {
                return of(AuthActions.SET_USER_SESSION({
                    email: userSession.email,
                    idToken: userSession.idToken,
                    tokenExpirationDate: tokenExpirationDate
                }))
            } else
                return of(AuthActions.UPDATE_LOCAL_STORAGE())
        })
    ))

    setUserSession = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.SET_USER_SESSION),
        mergeMap(payload => {

            this.router.navigate([''])

            let timeout = setTimeout(
                () => { this.store.dispatch(AuthActions.LOGOUT_USER()) },
                payload.tokenExpirationDate.getTime() - new Date().getTime()
            );
            return of(AuthActions.SET_SESSION_TIMEOUT({ timeoudIndex: Number(timeout) }))
        })
    ))

    userLogout = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGOUT_USER),
        tap(() => this.router.navigate(['']))
    ), { dispatch: false })

    setUserSessionToLocalStorage = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.UPDATE_LOCAL_STORAGE, AuthActions.LOGOUT_USER),
        tap(() => {
            this.store.select('authReducer').pipe(take(1)).subscribe(state => {
                if (state.userSession)
                    localStorage.setItem('userSession', JSON.stringify(state.userSession))
                else if ('userSession' in localStorage)
                    localStorage.removeItem('userSession')
            })
        })
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private authHttpService: AuthHttpService,
        private store: Store<AppReducer>,
        private router: Router
    ) { }
}

function getDlateWithOffset(offsetInSeconds: number) {
    return new Date(new Date().getTime() + offsetInSeconds * 1000)
}