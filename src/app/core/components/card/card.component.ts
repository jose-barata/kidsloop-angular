import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
    @HostBinding('class.app-card')
    public card: boolean = true;
}
