export class UserSession {
    constructor(
        readonly email: string,
        readonly idToken: string,
        readonly tokenExpirationDate: Date
    ) { }
}