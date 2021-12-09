import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class NewsHttpInterceptor implements HttpInterceptor {
    private key = 'nCii8HkkjtJmLVGQRBYZAo9ArwQ83xJe';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const modifiedReq = req.clone({ params: new HttpParams().set('api-key', this.key) });

        return next.handle(modifiedReq);
    }
}