import { TestBed } from "@angular/core/testing"
import { AuthHttpService } from "./auth.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { AuthResponseData } from "../models/auth-response.model"
import { AuthInterceptor } from "./interceptors/auth-interceptor.service"
import { HTTP_INTERCEPTORS } from "@angular/common/http"


const mockResponse: AuthResponseData = {
    idToken: null,
    email: null,
    refreshToken: null,
    expiresIn: null,
    localId: null
}

describe('AuthHttpService', () => {

    let service: AuthHttpService,
        httpController: HttpTestingController;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthHttpService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        service = TestBed.inject(AuthHttpService);
        httpController = TestBed.inject(HttpTestingController);
    })

    it('should send post request with params for user sign up', () => {
        const email = 'luuk@gmail.com',
            password = '123456';

        service.signupUser(email, password).subscribe(response => {
            expect(response.email).toEqual(email);
        })

        const req = httpController.expectOne(req => {
            return (req.url == service.SIGNUP_URL) && req.params.has('key');
        });
        expect(req.request.body).toEqual({ email: email, password: password, returnSecureToken: true });
        expect(req.request.method).toEqual('POST')

        req.flush({ ...mockResponse, email: email })
    })

    it('should send post request with params for user sign in', () => {
        const email = 'luuk@gmail.com',
            password = '123456';

        service.signinUser(email, password).subscribe(response => {
            expect(response.email).toEqual(email);
        })

        const req = httpController.expectOne(req => {
            return (req.url == service.SIGNIN_URL) && req.params.has('key');
        });
        expect(req.request.body).toEqual({ email: email, password: password, returnSecureToken: true });
        expect(req.request.method).toEqual('POST')

        req.flush({ ...mockResponse, email: email })
    })

    afterEach(() => {
        httpController.verify();
    })
})