import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, mergeMap } from "rxjs/operators";
import { NewsHttpService } from "../http/news.service";
import * as NewsActions from './news.actions'



@Injectable()
export class NewsEffects {
    getNewsFromNYT$ = createEffect(() => this.action$.pipe(
        ofType(NewsActions.GET_NEWS_FROM_NYT),
        mergeMap(payload => this.newsService.retrieveTopStories(payload.topic).pipe(
            concatMap(response => {
                return [NewsActions.SET_NEWS({ newsData: response })]
            }),
            catchError(err => of(NewsActions.GET_NEWS_FROM_NYT_FAIL({ error: err })))
        ))
    ))


    constructor(
        private action$: Actions,
        private newsService: NewsHttpService
    ) { }
}