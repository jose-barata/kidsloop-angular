import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-button, [app-button]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
    @HostBinding('class.app-button')
    public button: boolean = true;
}
