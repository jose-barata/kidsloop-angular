import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountService } from './services/create-account.service';

@NgModule({
    declarations: [CreateAccountComponent],
    imports: [CommonModule, CreateAccountRoutingModule, ReactiveFormsModule, CoreModule],
    providers: [CreateAccountService],
})
export class CreateAccountModule {}
