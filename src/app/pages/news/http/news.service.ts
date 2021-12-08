import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewsResponse } from "../models/get-response.model";

@Injectable()
export class NewsHttpService {

    static readonly BASE_URL = 'https://api.nytimes.com/svc/topstories/v2';
    readonly TOP_STORIES_URL = 'https://api.nytimes.com/svc/topstories/v2';

    constructor(private http: HttpClient) { }

    retrieveTopStories(section: string) {
        return this.http.get<NewsResponse>(this.TOP_STORIES_URL + `/${section}.json`)
    }
}