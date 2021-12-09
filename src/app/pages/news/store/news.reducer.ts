import { Action, createReducer, on } from "@ngrx/store";
import { NewsData } from "../models/news.model";
import * as NewsActions from "./news.actions"
import { NewsResponseI } from "../models/get-response.model";

export interface NewsState {
    newsData: NewsData[]
    error: string
}

const initialState: NewsState = {
    newsData: null,
    error: null
}

const _newsReducer = createReducer(initialState,
    on(NewsActions.GET_NEWS_FROM_NYT, (state, payload) => {
        return { ...state }
    }),
    on(NewsActions.SET_NEWS, (state, payload) => {
        let newsResults: NewsResponseI[] = payload.newsData.results;
        let newsData: NewsData[] = newsResults
            .filter(elem => !!elem.multimedia)
            .map(elem => new NewsData(elem.title, elem.multimedia[0].url))

        return { ...state, newsData: newsData }
    }),
    on(NewsActions.GET_NEWS_FROM_NYT_FAIL, (state, payload) => {
        console.log(payload.error)
        return { ...state, error: "Something went wrong loading the news. Try again later" }
    }),
    on(NewsActions.RESOLVE_NEWS_ERROR, (state) => {
        return { ...state, error: null }
    })

)

export function newsReducer(state: NewsState, action: Action) {
    return _newsReducer(state, action);
}