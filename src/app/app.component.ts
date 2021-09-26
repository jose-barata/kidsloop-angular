import { Component, OnInit } from '@angular/core';
import { LanguageService } from './core/services/language.service';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'kidsloop-angular';

    constructor(private languageService: LanguageService) {}

    ngOnInit(): void {
        this.languageService.initLanguage();
    }
}
