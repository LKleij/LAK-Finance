import { Action, createReducer, on } from "@ngrx/store";
import { NewsData } from "../models/news.model";
import * as NewsActions from "./news.actions"
import { NewsResponseI } from "../models/get-response.model";


export interface NewsState {
    newsData: NewsData[]
}

const initialState: NewsState = {
    newsData: null
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
        return { ...state }
    })

)

export function newsReducer(state: NewsState, action: Action) {
    return _newsReducer(state, action);
}