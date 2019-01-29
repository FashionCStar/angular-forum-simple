import {Directive, HostListener, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[saJquiDialogLauncher]'
})
export class JquiDialogLauncher {
    @Input() saJquiDialogLauncher: any;

    constructor(private el: ElementRef) {
    }

    @HostListener('click', ['$event']) onClick(e) {
        $(this.saJquiDialogLauncher).dialog("open");
    }

}
