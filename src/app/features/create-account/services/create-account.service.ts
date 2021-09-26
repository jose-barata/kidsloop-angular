import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpRequest, SignUpResponse } from '../models/sign-up.model';

@Injectable()
export class CreateAccountService {
    constructor(private httpClient: HttpClient) {}

    createAccount(signInRequest: SignUpRequest): Observable<SignUpResponse> {
        return this.httpClient.patch<SignUpResponse>('kidsloop-test/accounts/sign-up', [
            { op: 'test', path: '/email', value: signInRequest.email },
            { op: 'test', path: '/password', value: signInRequest.password },
        ]);
    }
}
