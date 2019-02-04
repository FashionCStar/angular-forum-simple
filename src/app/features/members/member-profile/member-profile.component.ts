import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MemberDetails} from "@app/models/member-details";
import {PostData} from "@app/models/post";
import {ApiMembersService} from '@app/services/members.service';
import {ApiAuthService} from "@app/services/auth.service";
import {catchError, map} from "rxjs/operators";
import {forEach} from "@angular/router/src/utils/collection";
import {NotificationService} from '@app/core/services';

@Component({
    selector: 'sa-member-profile',
    templateUrl: './member-profile.component.html',
    styleUrls: ['./member-profile.component.css']
})

export class MemberProfileComponent implements OnInit {

    memberDetails: MemberDetails;
    postData: PostData;
    noteList: Array <PostData>;
    member_id: number;
    admin_id: number;
    modalcontent: any;
    memberNote: PostData;
    @ViewChild('updateMember') updateMember;
    @ViewChild('updateNote') updateNote;
    @ViewChild('updateChildNote') updateChildNote;
    @ViewChild('deleteNote') deleteNote;
    @ViewChild('deleteChildNote') deleteChildNote;
    @ViewChild('addCommentNote') addCommentNote;
    @ViewChild('addCommentChildNote') addCommentChildNote;

    constructor(private activatedRoute: ActivatedRoute
                , public router: Router
                , public members: ApiMembersService
                ,private notificationService: NotificationService) {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.member_id = params['member_id'];
        });
    }

    ngOnInit() {
        this.memberDetails = new MemberDetails();
        this.postData = new PostData();
        this.postData.member_id = this.member_id;
        this.admin_id = JSON.parse(localStorage.getItem('user')).id;
        this.postData.admin_id = this.admin_id;
        // console.log(JSON.parse(localStorage.getItem('user')));
        this.getMemberDetails(this.member_id);
    }

    showMemberModal() {
        this.modalcontent = Object.assign({}, JSON.parse(JSON.stringify(this.memberDetails)));
        console.log(this.modalcontent);
        this.modalcontent.member_info.password=null;
        this.updateMember.show();
    }

    showCommentModal(relation, note) {
        this.memberNote = Object.assign({}, JSON.parse(JSON.stringify(note)));
        let isadded = false;
        if (this.memberNote['like_symbols']) {
            for (let i = 0; i < this.memberNote['like_symbols'].length; i++) {
                if (this.admin_id == this.memberNote['like_symbols'][i].admin_id) {
                    isadded = true;
                    break;
                }
            }
        }
        if (isadded == false) {
            if (relation == 'parent') {
                this.addCommentNote.show();
            } else if (relation == 'child') {
                this.addCommentChildNote.show();
            }
        } else {
            this.notificationService.smallBox({
                title: "Alert",
                content: "You already added comment to this note",
                color: "#C46A69",
                timeout: 8000,
                icon: "fa fa-warning shake animated",
                number: "4"
            });
        }
    }

    showNoteModal(relation, note) {
        this.memberNote = Object.assign({}, JSON.parse(JSON.stringify(note)));
        if (relation == 'parent') {
            this.updateNote.show();
        } else if (relation == 'child') {
            this.updateChildNote.show();
        }
    }

    showConfirmModal(relation, note) {
        this.memberNote = Object.assign({}, JSON.parse(JSON.stringify(note)));
        if (relation == 'parent') {
            this.deleteNote.show();
        } else if (relation == 'child') {
            this.deleteChildNote.show();
        }
    }

    closeMemberModal() {
        this.updateMember.hide();
    }

    closeCommentModal(relation) {
        if (relation == 'parent') {
            this.addCommentNote.hide();
        } else if (relation == 'child') {
            this.addCommentChildNote.hide();
        }
    }

    closeNoteModal(relation) {
        if (relation == 'parent') {
            this.updateNote.hide();
        } else if (relation == 'child') {
            this.updateChildNote.hide();
        }
    }

    closeConfirmModal(relation) {
        if (relation == 'parent') {
            this.deleteNote.hide();
        } else if (relation == 'child') {
            this.deleteChildNote.hide();
        }
    }

    getMemberDetails(member_id) {
        this.members.getMemberDetails(member_id).subscribe(
            data => {
                if (data['status']) {
                    this.memberDetails.member_info = data['member_info'][0];
                    this.memberDetails.websites = data['websites'][0];
                    this.memberDetails.funding_sources = data['funding_sources'][0];

                    let notes = [];
                    notes = Object.keys(data['notes']).map(function(k) { return data['notes'][k] });
                    this.memberDetails.notes = notes;

                    for (let i=0; i<notes.length; i++) {
                        let childnotes = [];
                        if (notes[i]['child_notes']) {
                            childnotes = (Object.keys(notes[i]['child_notes']).map(function (key) {
                                return notes[i]['child_notes'][key];
                            }));
                        }
                        this.memberDetails.notes[i]['child_notes'] = childnotes;
                    }
                    console.log(this.memberDetails.notes);
                }
            }
        )
    }


    update(member) {
        if (member.member_info.password == null) {
            member.member_info.password = this.memberDetails.member_info.password;
        }
        this.memberDetails = Object.assign({}, member);
        this.members.updateMemberDetails(this.memberDetails.member_info).subscribe(
            data => {
                if (data['status']) {
                    // alert(data['result']);
                    this.updateMember.hide();
                    this.notificationService.smallBox({
                        title: "Success",
                        content: data['result'],
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                }
            }
        )
    }

    addPost(note, current_noteId=null) {
        let postData = {};
        if (note.reply) {
            postData = {admin_id:this.admin_id,
                member_id:this.member_id,
                note:note.reply, parent_note_id: note.note_id};
        } else {
            postData = note;
        }
        this.members.addPost(postData).subscribe(
            data => {
                if (data['status']) {
                    // alert(data['result']);
                    this.postData.note = null;
                    this.notificationService.smallBox({
                        title: "Success",
                        content: data['result'],
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                    this.getMemberDetails(this.member_id);
                }
            }
        )
    }

    editNote(postData) {
        const pp = this.memberDetails.notes.find(p => p['note_id'] === postData['note_id']);
        Object.assign(pp, postData);
        this.members.editNote(postData).subscribe(
            data => {
                if (data['status']) {
                    // alert(data['result']);
                    this.updateNote.hide();
                    this.notificationService.smallBox({
                        title: "Success",
                        content: data['result'],
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                }
            }
        )
    }

    editChildNote(postData) {
        this.members.editNote(postData).subscribe(
            data => {
                if (data['status']) {
                    // alert(data['result']);
                    this.updateChildNote.hide();
                    this.notificationService.smallBox({
                        title: "Success",
                        content: data['result'],
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                    this.getMemberDetails(this.member_id);
                }
            }
        )
    }
    removeNote(note) {
        const removeIndex = this.memberDetails.notes.findIndex(pp=>pp['note_id']  === note['note_id']);
        console.log(removeIndex);
        this.members.deleteNote(note).subscribe(
            data => {
                if (data['status']) {
                    this.deleteNote.hide();
                    this.notificationService.smallBox({
                        title: "Remove",
                        content: data['result'],
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                    this.memberDetails.notes.splice(removeIndex, 1);
                }
            }
        )
    }

    removeChildNote(note) {
        this.members.deleteNote(note).subscribe(
            data => {
                if (data['status']) {
                    this.deleteNote.hide();
                    this.notificationService.smallBox({
                        title: "Success",
                        content: data['result'],
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                    this.getMemberDetails(this.member_id);
                }
            }
        )
    }

    addLikeComment(note, comment) {
        this.members.addLikeComment(note.note_id, this.admin_id, comment).subscribe(
            data => {
                if (data['status']) {
                    this.notificationService.smallBox({
                        title: "Success",
                        content: "You added comment successfully",
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                    this.getMemberDetails(this.member_id);
                }
            }
        )
    }

    removeLikeComment(note) {
        console.log(note);
        this.members.removeLikeComment(note.note_id, this.admin_id).subscribe(
            data => {
                if (data['status']) {
                    this.notificationService.smallBox({
                        title: "Success",
                        content: "You removed comment successfully",
                        color: "#739E73",
                        timeout: 8000,
                        icon: "fa fa-check",
                        number: "4"
                    });
                    this.getMemberDetails(this.member_id);
                }
            }
        )
    }
}
