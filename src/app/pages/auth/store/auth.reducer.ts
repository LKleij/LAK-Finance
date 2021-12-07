import { Action, createReducer, on } from "@ngrx/store";
import { UserSession } from "../models/userSession.model";
import * as AuthActions from "./auth.actions"

export interface AuthState {
    userSession: UserSession;
    sessionTimeoutIndex: number;
}

export const initialState = {
    userSession: null,
    sessionTimoutIndex: null
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
        if (state.sessionTimoutIndex)
            clearTimeout(state.sessionTimoutIndex);
        return { ...state, userSession: null, sessionTimoutIndex: null }
    }),
    on(AuthActions.SET_SESSION_TIMEOUT, (state, payload) => {
        return { ...state, sessionTimoutIndex: payload.timeoudIndex }
    })
);

export function authReducer(state, action: Action) {
    return _authReducer(state, action);
}

