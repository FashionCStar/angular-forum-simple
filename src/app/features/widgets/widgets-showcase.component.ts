import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'sa-widgets-showcase',
    templateUrl: './widgets-showcase.component.html',
})
export class WidgetsShowcaseComponent implements OnInit {

    demoStyle = 'style1';

    demoShowTabs = false;

    constructor() {
    }

    setStyle(style) {
        this.demoStyle = style
    }

    ngOnInit() {
    }

}
