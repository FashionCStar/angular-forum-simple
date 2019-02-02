import {Component, OnInit} from '@angular/core';
import {Member} from '@app/models/member';
import {ApiMembersService} from '@app/services/members.service';
import {Router} from "@angular/router";
import {ApiAuthService} from "@app/services/auth.service";
import {catchError, map} from "rxjs/operators";

@Component({
    selector: 'sa-all-leads',
    templateUrl: './all-leads.component.html',
    styleUrls: ['./all-leads.component.css']
})
export class AllLeadsComponent implements OnInit {

    member: Member;
    myoption: any;

    public memberList: Array<Member>;

    constructor(public router: Router
        , public members: ApiMembersService) {
    }

    ngOnInit() {
        this.member = new Member();
        // this.getMembers();
        this.myoption = {
            ajax: (data, callback, settings) => {
                this.members.getMembers("LEAD")
                    .subscribe((data) => {
                        callback({
                            aaData: data['results']
                        })
                    })
            },
            columns: [
                {
                    "data": "first_name",
                    "render": function (data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="/#/leads/lead-profile?member_id='+row.member_id+'">' + data + '</a>';
                        }
                        return data;
                    }
                },
                {
                    "data": "last_name",
                    "render": function (data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="/#/leads/lead-profile?member_id='+row.member_id+'">' + data + '</a>';
                        }
                        return data;
                    }
                },
                {data: "email"},
                {data: "website"},
                {data: "service_name"},
                {data: "status"},
            ]
        };
    }

    getMembers(member_status = null, website_type = null, service_id = null) {
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
