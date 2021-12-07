import { state } from "@angular/animations";
import { HttpErrorResponse } from "@angular/common/http";
import { Action, createReducer, on } from "@ngrx/store";
import { UserSession } from "../models/userSession.model";
import * as AuthActions from "./auth.actions"

export interface AuthState {
    userSession: UserSession;
    sessionTimeoutIndex: number;
    authError: { errorMessage: string, errorDescription: string };
}

export const initialState: AuthState = {
    userSession: null,
    sessionTimeoutIndex: null,
    authError: null
}

const _authReducer = createReducer(initialState,
    on(AuthActions.SET_USER_SESSION, (state, payload) => {
        let userSession = new UserSession(
            payload.email,
            payload.idToken,
            payload.tokenExpirationDate
        )
        return { ...state, userSession: userSession };
    }),
    on(AuthActions.LOGOUT_USER, (state) => {
        if (state.sessionTimeoutIndex)
            clearTimeout(state.sessionTimeoutIndex);
        return { ...state, userSession: null, sessionTimoutIndex: null }
    }),
    on(AuthActions.SET_SESSION_TIMEOUT, (state, payload) => {
        return { ...state, sessionTimoutIndex: payload.timeoudIndex }
    }),
    on(AuthActions.USER_AUTHENTICATE_FAIL, (state, payload) => {
        const err: HttpErrorResponse = payload.error;
        let errorMessage = err.error.error.message;
        errorMessage = errorMessage.split(':', 1)[0].trim()
        return { ...state, authError: { errorMessage: errorMessage, errorDescription: handleError(errorMessage) } }
    }),
    on(AuthActions.RESOLVE_AUTH_ERROR, (state) => {

        return { ...state, authError: null }
    })
);

export function authReducer(state, action: Action) {
    return _authReducer(state, action);
}



function handleError(errorMessage: string) {
    switch (errorMessage) {
        case 'EMAIL_EXISTS':
            return 'The email address is already in use by another account.'
        case 'OPERATION_NOT_ALLOWED':
            return 'Password sign-in is disabled for this project.'
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return 'We have blocked all requests from this device due to unusual activity. Try again later.'
        case 'EMAIL_NOT_FOUND':
            return 'The email address is already in use by another account.'
        case 'INVALID_PASSWORD':
            return 'The password is invalid or the user does not have a password.'
        case 'USER_DISABLED':
            return 'The user account has been disabled by an administrator.'
    }
}
