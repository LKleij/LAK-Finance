import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthComponent } from './pages/auth/auth.component';
import { IndexComponent } from './pages/index/index.component';
import { NavigationtopComponent } from './features/navigationtop/navigationtop.component';
import { AppRouterModule } from './app-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { authReducer } from './pages/auth/store/auth.reducer';
import { AuthEffects } from './pages/auth/store/auth.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './pages/auth/http/interceptors/auth-interceptor.service';
import { AuthHttpService } from './pages/auth/http/auth.service';
import { NavigationleftComponent } from './features/navigationleft/navigationleft.component';
import { NewsComponent } from './pages/news/news.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './pages/auth/http/guards/auth.guard'
import { AppInterceptor } from './interceptors/app.interceptor';
import { NewsHttpInterceptor } from './pages/news/http/interceptor/news.interceptor';
import { NewsEffects } from './pages/news/store/news.effects';
import { NewsHttpService } from './pages/news/http/news.service';
import { _AppReducer } from './store/app.reducer';
import { NewsItemComponent } from './features/news-item/news-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    IndexComponent,
    NavigationtopComponent,
    NavigationleftComponent,
    NewsComponent,
    DashboardComponent,
    NewsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(_AppReducer),
    EffectsModule.forRoot([AuthEffects, NewsEffects])
  ],
  providers: [
    NewsHttpInterceptor,
    AuthInterceptor,
    AuthHttpService,
    NewsHttpService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
