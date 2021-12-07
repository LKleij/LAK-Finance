import { AuthState } from '../pages/auth/store/auth.reducer'

export interface AppState extends AuthState { }
export interface AppReducer {
    authReducer: AppState;
}
