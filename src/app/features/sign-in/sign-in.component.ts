import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignInRequest, SignInResponse } from './models/sign-in.model';
import { SignInService } from './services/sign-in.service';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public loading: boolean = false;

    private emailValidators: ValidatorFn[] = [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ];
    private passwordValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6)];

    private isDestroyed: Subject<void> = new Subject<void>();

    constructor(private fb: FormBuilder, private signInService: SignInService) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: [undefined],
            password: [undefined],
        });
    }

    ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    onSignIn(): void {
        this.form.controls.email.addValidators(this.emailValidators);
        this.form.controls.password.addValidators(this.passwordValidators);
        this.form.controls.email.updateValueAndValidity();
        this.form.controls.password.updateValueAndValidity();

        if (this.form.valid) {
            const signInRequest: SignInRequest = {
                email: this.form.value.email,
                password: this.form.value.password,
            };

            this.loading = true;
            this.signInService
                .signIn(signInRequest)
                .pipe(takeUntil(this.isDestroyed))
                .subscribe(
                    (response: SignInResponse) => {
                        console.log(`Welcome, ${response.name}!`);
                    },
                    (error: HttpErrorResponse) => {
                        console.log(error);
                    },
                    () => {
                        timer(2000).subscribe(() => {
                            this.loading = false;
                        });
                    }
                );
        }
    }
}
