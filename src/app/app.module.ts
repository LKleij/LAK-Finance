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
import { AuthInterceptor } from './pages/auth/interceptors/auth-interceptor.service';
import { AuthHttpService } from './pages/auth/auth.service';
import { NavigationleftComponent } from './features/navigationleft/navigationleft.component';
import { NewsComponent } from './pages/news/news.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './pages/auth/guards/auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    IndexComponent,
    NavigationtopComponent,
    NavigationleftComponent,
    NewsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ authReducer: authReducer }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    AuthHttpService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
