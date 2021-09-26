import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { MenuComponent } from './components/menu/menu.component';
import { MiscComponent } from './components/misc/misc.component';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';

@NgModule({
    declarations: [ButtonComponent, CardComponent, MiscComponent, MenuComponent],
    imports: [CommonModule],
    exports: [ButtonComponent, CardComponent, MiscComponent],
    providers: [ThemeService, LanguageService],
})
export class CoreModule {}
