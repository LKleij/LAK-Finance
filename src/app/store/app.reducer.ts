import { AuthState } from '../pages/auth/store/auth.reducer'
import { NewsState } from '../pages/news/store/news.reducer'
import { authReducer } from '../pages/auth/store/auth.reducer'
import { newsReducer } from '../pages/news/store/news.reducer'

export interface AppState extends AuthState, NewsState { }

export interface AppReducer {
    authReducer: AppState;
    newsReducer: NewsState;
}

export const _AppReducer = {
    authReducer: authReducer,
    newsReducer: newsReducer
}
