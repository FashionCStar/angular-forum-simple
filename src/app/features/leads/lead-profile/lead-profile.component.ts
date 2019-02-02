import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MemberDetails} from "@app/models/member-details";
import {PostData} from "@app/models/post";
import {ApiMembersService} from '@app/services/members.service';
import {ApiAuthService} from "@app/services/auth.service";
import {catchError, map} from "rxjs/operators";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'sa-lead-profile',
    templateUrl: './lead-profile.component.html',
    styleUrls: ['./lead-profile.component.css']
})

export class LeadProfileComponent implements OnInit {

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

    constructor(private activatedRoute: ActivatedRoute
                , public router: Router
                , public members: ApiMembersService) {
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
        if (member.member_info.password != null) {
            this.memberDetails = Object.assign({}, member);
            this.members.updateMemberDetails(this.memberDetails.member_info).subscribe(
                data => {
                    if (data['status']) {
                        alert(data['result']);
                        this.updateMember.hide();
                    }
                }
            )
        } else {
            alert("Please input password");
        }
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
                    alert(data['result']);
                    this.postData.note = null;
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
                    alert(data['result']);
                    this.updateNote.hide();
                }
            }
        )
    }

    editChildNote(postData) {
        this.members.editNote(postData).subscribe(
            data => {
                if (data['status']) {
                    alert(data['result']);
                    this.updateChildNote.hide();
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
                    this.getMemberDetails(this.member_id);
                }
            }
        )
    }

    addLikeComment(note) {
        console.log(note);
        this.members.addLikeComment(note.note_id, this.admin_id, "fa fa-thumbs-up").subscribe(
            data => {
                if (data['status']) {
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
                    this.getMemberDetails(this.member_id);
                }
            }
        )
    }
}
