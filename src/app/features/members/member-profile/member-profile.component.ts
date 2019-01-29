import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MemberDetails} from "@app/models/member-details";
import {ApiMembersService} from '@app/services/members.service';
import {ApiAuthService} from "@app/services/auth.service";
import {catchError, map} from "rxjs/operators";

@Component({
    selector: 'sa-member-profile',
    templateUrl: './member-profile.component.html',
    styleUrls: ['./member-profile.component.css']
})

export class MemberProfileComponent implements OnInit {

    memberDetails: MemberDetails;
    member_id: number;
    modalcontent: any;

    constructor(private activatedRoute: ActivatedRoute
                , public router: Router
                , public members: ApiMembersService) {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.member_id = params['member_id'];
        });
    }

    ngOnInit() {
        this.memberDetails = new MemberDetails();
        this.getMemberDetails(this.member_id);
    }

    getMemberDetails(member_id) {
        this.members.getMemberDetails(member_id).subscribe(
            data => {
                if (data['status']) {
                    this.memberDetails.member_info = data['member_info'][0];
                    this.memberDetails.websites = data['websites'][0];
                    this.memberDetails.funding_sources = data['funding_sources'][0];
                    this.modalcontent = Object.assign({}, this.memberDetails);
                    console.log(this.memberDetails);
                }
            }
        )
    }
}
