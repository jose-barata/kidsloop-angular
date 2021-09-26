import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { SignInService } from './services/sign-in.service';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        SignInRoutingModule,
        ReactiveFormsModule,
        CoreModule,
        TranslateModule.forChild(),
    ],
    providers: [SignInService],
})
export class SignInModule {}
