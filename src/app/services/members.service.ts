import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {PostData} from '../models/post';

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

    public getMembers(member_status = null, website_type = null, service_id = null) {
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

    public getMemberDetails(member_id = null) {
        return this.http
            .post(this.baseurl + '/admin/getMemberDetails', {
                member_id: member_id,
            }, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }

    public updateMemberDetails(member_details) {
        return this.http
            .post(this.baseurl + '/admin/updateMemberDetails', member_details, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }

    public addPost(postData) {
        return this.http
            .post(this.baseurl + '/admin/addNote', postData, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }

    public editNote(postData) {
        return this.http
            .post(this.baseurl + '/admin/updateNote', postData, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }

    public deleteNote(note) {
        return this.http
            .post(this.baseurl + '/admin/deleteNote', note, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }

    public addLikeComment(note_id, admin_id, html_snippet) {
        return this.http
            .post(this.baseurl + '/admin/likeNote',
                {note_id: note_id, admin_id: admin_id, html_snippet: html_snippet}, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }

    public removeLikeComment(note_id, admin_id) {
        return this.http
            .post(this.baseurl + '/admin/unlikeNote',
                {note_id: note_id, admin_id: admin_id}, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
}
