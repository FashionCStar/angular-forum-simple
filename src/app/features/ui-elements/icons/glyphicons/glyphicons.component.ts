import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
    selector: 'sa-glyphicons',
    templateUrl: './glyphicons.component.html',
    styleUrls: ['./glyphicons.component.css']
})
export class GlyphiconsComponent implements OnInit {

    containers: any
    search = '';

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.containers = this.el.nativeElement.querySelectorAll('.bs-glyphicons li')
    }

    onKey(event: any) {
        this.search = event.target.value;

        Array.prototype.forEach.call(this.containers, (container) => {
            if (container.querySelectorAll('[class*="' + this.search + '"]').length > 0) {
                container.style.display = 'block'
            } else {
                if (this.search) {
                    container.style.display = 'none'
                } else {
                    container.style.display = 'block'
                }
            }
        })
    }

}
