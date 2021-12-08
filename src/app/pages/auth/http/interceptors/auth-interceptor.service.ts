import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private key = 'AIzaSyBvKsdCL2AKFqqtglq5dK52shg97-4mNMU';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("auth");

        const modifiedReq = req.clone({
            params: new HttpParams().set('key', this.key)
        })

        return next.handle(modifiedReq);
    }
}
