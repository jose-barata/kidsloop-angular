import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme.model';

@Injectable()
export class ThemeService {
    private storage: Storage = localStorage;

    public currentTheme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.LIGHT);

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.initTheme();
    }

    initTheme(): void {
        const theme: string | null = this.storage.getItem('THEME');
        if ((theme && theme === Theme.DARK) || theme === Theme.LIGHT) {
            this.document.body.className = theme;
            this.currentTheme.next(theme);
        } else {
            this.document.body.className = Theme.LIGHT;
            this.currentTheme.next(Theme.LIGHT);
        }
    }

    toggleTheme(theme: Theme): void {
        this.currentTheme.next(theme);
        this.storage.setItem('THEME', theme);
        this.document.body.className = theme;
    }
}
