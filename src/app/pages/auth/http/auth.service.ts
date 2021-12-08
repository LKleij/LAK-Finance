import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponseData } from "../models/auth-response.model";


@Injectable()
export class AuthHttpService {

    static readonly BASE_URL = 'https://identitytoolkit.googleapis.com/v1/'
    static readonly SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
    static readonly SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'

    readonly SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
    readonly SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'


    signupUser(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.SIGNUP_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
    }

    signinUser(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.SIGNIN_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
    }

    constructor(private http: HttpClient) { }
}