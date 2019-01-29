import {Component, OnInit} from '@angular/core';
import {Member} from '../../../models/member';
import {ApiMembersService} from '../../../services/members.service';
import {Router} from "@angular/router";
import {ApiAuthService} from "@app/services/auth.service";
import {catchError, map} from "rxjs/operators";

@Component({
    selector: 'sa-datatables-case',
    templateUrl: './datatables-case.component.html',
})
export class DatatablesCaseComponent implements OnInit {
    member: Member;
    myoption: any;

    public memberList: Array<Member>;
    // dtOptions: DataTables.Settings = {};

    constructor(public router: Router
        , public members: ApiMembersService) {
    }

    ngOnInit() {
        this.member = new Member();
        // this.getMembers();
        this.myoption = {
            ajax: (data, callback, settings) => {
                this.members.getMembers()
                    .subscribe((data) => {
                        console.log('data from rest endpoint', data);
                        callback({
                            aaData: data['results']
                        })
                    })
            },
            columns: [
                {data: "first_name"},
                {
                    "data": "last_name",
                    "render": function(data, type, row, meta){
                        if(type === 'display'){
                            data = '<a href="' + row.myid + '">' + data + '</a>';
                        }
                        return data;
                    }
                },
                {data: "last_name"},
                {data: "email"},
                {data: "website"},
                {data: "service_name"},
                {data: "status"},
            ]
        };
    }

    getMembers(member_status=null, website_type=null, service_id=null) {
        this.members.getMembers(member_status, website_type, service_id).subscribe(
            data => {
                if (data['status']) {
                    this.memberList = data['results'];
                    // console.log(this.memberList);
                }
            }
        )
    }

}
