import {Directive, Input, HostListener} from '@angular/core';

@Directive({
    selector: '[summernoteDetach]'
})
export class SummernoteDetachDirective {

    @Input() summernoteDetach: any;

    constructor() {
    }

    @HostListener('click') render() {
        $(this.summernoteDetach).summernote('destroy');
    }
}


