import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class ApiAuthService {

    baseurl = 'https://api.registration.menu/api';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'REGISTRATIONKEY': 'mf8fXFYtl3DqRpxzu1XZWTD1GNHtUSqQ'
        })
    };

    constructor(private http: HttpClient) {
    }

    public authenticate(user: User) {
        return this.http
            .post(this.baseurl + '/admin/adminLogin', {
                email: user.email,
                password: user.password
            }, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
}
