import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignInResponse } from '../sign-in/models/sign-in.model';
import { CreateAccountService } from './services/create-account.service';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit, OnDestroy {
    public form: FormGroup;

    private emailValidators: ValidatorFn[] = [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ];
    private passwordValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6)];

    private confirmPasswordValidators: ValidatorFn[] = [
        Validators.required,
        Validators.minLength(6),
        this.passwordMatchValidatorFn(),
    ];

    private isDestroyed: Subject<void> = new Subject<void>();

    constructor(private fb: FormBuilder, private createAccountService: CreateAccountService) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: [undefined],
            password: [undefined],
            confirmPassword: [undefined],
        });
    }

    ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    onCreateAccount(): void {
        this.form.controls.email.addValidators(this.emailValidators);
        this.form.controls.password.addValidators(this.passwordValidators);
        this.form.controls.confirmPassword.addValidators(this.confirmPasswordValidators);
        this.form.controls.email.updateValueAndValidity();
        this.form.controls.password.updateValueAndValidity();
        this.form.controls.confirmPassword.updateValueAndValidity();

        if (this.form.valid) {
            this.createAccountService
                .createAccount(this.form.value.email)
                .pipe(takeUntil(this.isDestroyed))
                .subscribe(
                    (response: SignInResponse) => {
                        console.log(response.id);
                    },
                    (error: HttpErrorResponse) => {
                        console.log(error);
                    },
                    () => {}
                );
        }
    }

    private passwordMatchValidatorFn(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value) {
                const passwordsMatch: boolean = control.value === this.form.value.password;
                return passwordsMatch ? null : { noMatch: true };
            }
            return null;
        };
    }
}
