import {Component, OnInit, Input} from '@angular/core';
// import {NgRedux} from "@angular-redux/store";
import {OptionsActions} from "../actions/options.actions";

@Component({
    selector: 'jcrop-option-radio',
    template: `
    <div >
        <input (change)="onChange()" [checked]="checked" name="{{group}}" type="radio" id="{{id}}" />
        <label htmlFor="{{id}}">{{label}}</label>
    </div>
  `,
    styles: []
})
export class OptionRadioComponent implements OnInit {

    static idCounter = 0;
    @Input() checked: boolean;
    @Input() group: string;
    @Input() label: string;
    @Input() options: string;
    @Input() storeId: string;
    public id: string;

    constructor(
        // private ngRedux: NgRedux<any>,
        private actions: OptionsActions) {
        this.id = 'jcrop-option-radio-' + OptionRadioComponent.idCounter++;
    }

    ngOnInit() {
    }

    onChange() {
        this.actions.setOptions({
            options: this.options,
            storeId: this.storeId
        })

    }
}
