import {Directive, OnInit, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[nouiSlider]'
})
export class NouisliderDirective implements OnInit {

    @Input() nouiSlider: any;
    @Output() change = new EventEmitter();

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        import('nouislider/distribute/nouislider.min.js').then((noUiSlider) => {

            const slider = this.el.nativeElement;

            const options = this.nouiSlider || {
                range: {
                    min: 0,
                    max: 1000
                },
            };

            noUiSlider.create(slider, options);

            slider.noUiSlider.on('change', () => {
                this.change.emit(slider.noUiSlider.get())
            });

        })
    }
}
