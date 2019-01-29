import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ApiMembersService {

    baseurl = 'https://api.registration.menu/api';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'REGISTRATIONKEY': 'mf8fXFYtl3DqRpxzu1XZWTD1GNHtUSqQ'
        })
    };

    constructor(private http: HttpClient) {
    }

    public getMembers(member_status=null, website_type=null, service_id=null) {
        return this.http
            .post(this.baseurl + '/admin/getMembers', {
                member_status: member_status,
                website_type: website_type,
                service_id: service_id
            }, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }

    public getMemberDetails(member_id=null) {
        return this.http
            .post(this.baseurl + '/admin/getMemberDetails', {
                member_id: member_id,
            }, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
}
