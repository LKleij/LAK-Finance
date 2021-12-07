import { createAction, props } from '@ngrx/store'

export interface AuthenticationData {
    email: string,
    password: string
}
export interface UserSessionData {
    email: string,
    idToken: string,
    tokenExpirationDate?: Date
}

export const USER_AUTHENTICATE_SIGNUP = createAction(
    '[Auth] post user registration request to server',
    props<AuthenticationData>()
);
export const USER_AUTHENTICATE_SIGNIN = createAction(
    '[Auth] post user login request to server',
    props<AuthenticationData>()
);
export const SET_USER_SESSION = createAction(
    '[Auth] set user session',
    props<UserSessionData>()
)
export const RETRIEVE_USER_SESSION_FROM_LOCAL_STORAGE = createAction('[Auth] retrieve user session from local storage')
export const USER_AUTHENTICATE_FAIL = createAction('[Auth] post user registration failed')
export const UPDATE_LOCAL_STORAGE = createAction('[Auth] update session in local storage')
export const LOGOUT_USER = createAction('[Auth] logout user')
export const SET_SESSION_TIMEOUT = createAction(
    '[Auth] set session timout',
    props<{ timeoudIndex: number }>()
)