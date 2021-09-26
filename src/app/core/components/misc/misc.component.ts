import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from '../../models/theme.model';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-misc',
    templateUrl: './misc.component.html',
    styleUrls: ['./misc.component.scss'],
})
export class MiscComponent implements OnInit, OnDestroy {
    theme: Theme;
    isLangMenuOpen: boolean = false;
    readonly themes: typeof Theme = Theme;

    private isDestroyed: Subject<void> = new Subject<void>();

    constructor(private themeService: ThemeService, private languageService: LanguageService) {}

    ngOnInit(): void {
        this.themeService.currentTheme.pipe(takeUntil(this.isDestroyed)).subscribe((theme: Theme) => {
            this.theme = theme;
        });
    }

    ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    onChangeTheme(theme: Theme): void {
        this.themeService.toggleTheme(theme);
    }

    onChangeLanguage(lang: string): void {
        this.languageService.changeLanguage(lang);
    }
}
