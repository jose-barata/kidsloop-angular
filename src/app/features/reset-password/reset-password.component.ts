import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResetPasswordResponse } from './models/reset-password.model';
import { ResetPasswordService } from './services/reset-password.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public loading: boolean = false;

    private emailValidators: ValidatorFn[] = [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ];

    private isDestroyed: Subject<void> = new Subject<void>();

    constructor(private fb: FormBuilder, private resetPasswordService: ResetPasswordService) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: [undefined],
        });
    }

    ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    onResetPassword(): void {
        this.form.controls.email.addValidators(this.emailValidators);
        this.form.controls.email.updateValueAndValidity();
        if (this.form.valid) {
            this.resetPasswordService
                .resetPassword(this.form.value.email)
                .pipe(takeUntil(this.isDestroyed))
                .subscribe(
                    (response: ResetPasswordResponse) => {
                        console.log(response.actionCompleted);
                    },
                    (error: HttpErrorResponse) => {
                        console.log(error);
                    },
                    () => {}
                );
        }
    }
}
