import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppReducer } from 'src/app/store/app.reducer';
import { NewsData } from './models/news.model';
import * as NewsActions from './store/news.actions'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  storeSubscription: Subscription;
  newsData: NewsData[];
  activeSection: number;

  constructor(private store: Store<AppReducer>) {
    this.storeSubscription = store.select('newsReducer').subscribe(state => this.newsData = state.newsData);
  }

  ngOnInit(): void {
    this.getNews('science');
  }

  getNews(topic: string) {
    switch (topic) {
      case 'science':
        this.activeSection = 0;
        break;
      case 'us':
        this.activeSection = 1;
        break;
      case 'business':
        this.activeSection = 2;
        break;
    }
    this.store.dispatch(NewsActions.GET_NEWS_FROM_NYT({ topic: topic }));
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
