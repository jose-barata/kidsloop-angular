import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './services/reset-password.service';

@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [CommonModule, ResetPasswordRoutingModule, ReactiveFormsModule, CoreModule],
    providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
