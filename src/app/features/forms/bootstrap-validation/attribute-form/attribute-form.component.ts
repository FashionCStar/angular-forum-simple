import {Component, OnInit} from '@angular/core';

@Component({

    selector: 'sa-attribute-form',
    templateUrl: './attribute-form.component.html',
})
export class AttributeFormComponent implements OnInit {

    submitted = false;

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.submitted = true;
        console.log('submitted')
    }

}
