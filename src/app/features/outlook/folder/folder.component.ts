import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {OutlookMessage} from "../shared/outlook-message.class";
import {OutlookService} from "../shared/outlook.service";

@Component({
    selector: 'sa-folder',
    templateUrl: './folder.component.html',
})
export class FolderComponent implements OnInit, OnDestroy {

    public messages: Array<OutlookMessage>;
    private activeFolderSub: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private outlookService: OutlookService) {
    }

    ngOnInit() {

        this.activeFolderSub = this.route.params.subscribe(params => {
            let folder = params['folder'];
            this.outlookService.getMessages(folder)

        });

        this.outlookService.messages.subscribe(messages => {
                this.messages = messages
            }
        );
    }

    ngOnDestroy() {
        this.activeFolderSub.unsubscribe();
    }

}
