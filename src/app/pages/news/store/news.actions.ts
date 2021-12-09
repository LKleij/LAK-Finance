import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { NewsResponse } from "../models/get-response.model";

export const GET_NEWS_FROM_NYT = createAction(
    '[News] get news data from nyt',
    props<{ topic: string }>()
)

export const SET_NEWS = createAction(
    '[News] set news',
    props<{ newsData: NewsResponse }>()
)

export const GET_NEWS_FROM_NYT_FAIL = createAction(
    '[News] faield to get news from NYT',
    props<{ error: HttpErrorResponse }>()
)

export const RESOLVE_NEWS_ERROR = createAction('[News] resolve news error');