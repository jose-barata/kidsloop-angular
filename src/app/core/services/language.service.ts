import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
    private storage: Storage = localStorage;

    private supportedLanguages: Record<string, string> = {
        en: 'en',
        pt: 'pt',
    };

    constructor(private translateService: TranslateService) {}

    initLanguage(): void {
        // for some reason I need to set all default languages to be able to use them
        this.translateService.setDefaultLang('pt');
        this.translateService.setDefaultLang('en');

        const lang: string | null = this.storage.getItem('LANG');
        const navigatorLanguage: string = navigator.language;

        if (lang && this.supportedLanguages[lang]) {
            this.setLanguage(lang);
        } else if (navigatorLanguage) {
            if (this.supportedLanguages[navigatorLanguage]) {
                this.setLanguage(navigatorLanguage);
            } else {
                this.setLanguage('en');
            }
        } else {
            this.setLanguage('en');
        }
    }

    changeLanguage(lang: string): void {
        this.setLanguage(lang);
    }

    private setLanguage(lang: string): void {
        document.documentElement.lang = lang;
        this.storage.setItem('LANG', lang);
        this.translateService.use(lang);
    }
}
