import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthHttpService } from "../pages/auth/http/auth.service";
import { AuthInterceptor } from "../pages/auth/http/interceptors/auth-interceptor.service";
import { NewsHttpInterceptor } from "../pages/news/http/interceptor/news.interceptor";
import { NewsHttpService } from "../pages/news/http/news.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private authInterceptor: AuthInterceptor, private newsInterceptor: NewsHttpInterceptor) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(NewsHttpService.BASE_URL))
            return this.newsInterceptor.intercept(req, next);
        else if (req.url.includes(AuthHttpService.BASE_URL))
            return this.authInterceptor.intercept(req, next);
    }
}
