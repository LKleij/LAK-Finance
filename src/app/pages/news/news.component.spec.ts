import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NewsItemComponent } from 'src/app/features/news-item/news-item.component';
import { AppReducer } from 'src/app/store/app.reducer';
import { NewsData } from './models/news.model';

import { NewsComponent } from './news.component';

const newsData = [
  new NewsData('title1', 'url1'),
  new NewsData('title2', 'url2'),
  new NewsData('title3', 'url3'),
  new NewsData('title4', 'url4')
]
const initialState = {
  newsData: newsData
}

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let store: MockStore<AppReducer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsComponent, NewsItemComponent],
      providers: [provideMockStore({ initialState: initialState })]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.refreshState()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all news items', () => {
    const el = fixture.debugElement;
    component.newsData = newsData;
    fixture.detectChanges();

    const items = el.queryAll(By.css('app-news-item'));

    expect(items.length).toEqual(newsData.length)
    expect(items[0].query(By.css('h4')).nativeElement.textContent).toEqual(newsData[0].title)
    expect(items[3].query(By.css('h4')).nativeElement.textContent).toEqual(newsData[3].title)
  })
});
