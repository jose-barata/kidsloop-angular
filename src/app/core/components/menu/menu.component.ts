import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    animations: [
        trigger('openClose', [
            state(
                'hidden',
                style({
                    opacity: 0,
                    visibility: 'hidden',
                    height: '0px',
                    transform: 'scale(0.5) translateY(-20%)',
                })
            ),
            state(
                'enter',
                style({
                    opacity: 1,
                    visibility: 'visible',
                    height: '*',
                    transform: 'scale(1) translateY(0%)',
                })
            ),
            transition('hidden => enter', [animate('150ms linear')]),
            transition('enter => hidden', [animate('100ms linear')]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
    @Input()
    public name: string = 'Edit card';

    @Input()
    public cardId: string;

    @Output()
    public isMenuOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isOpen: boolean = false;

    constructor(private elementRef: ElementRef) {}

    @HostListener('document:click', ['$event'])
    public clickout(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
            this.isMenuOpen.emit(this.isOpen);
        }
    }

    @HostListener('document:keyup', ['$event'])
    public accessibility(event: KeyboardEvent): void {
        if (this.isOpen && ['Escape', 'Esc'].includes(event.key)) {
            this.isOpen = false;
            this.isMenuOpen.emit(this.isOpen);
        }
    }

    public toggleMenu(): void {
        this.isOpen = !this.isOpen;
        this.isMenuOpen.emit(this.isOpen);
    }
}
