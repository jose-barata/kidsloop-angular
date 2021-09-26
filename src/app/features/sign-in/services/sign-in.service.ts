import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest, SignInResponse } from '../models/sign-in.model';

@Injectable()
export class SignInService {
    constructor(private httpClient: HttpClient) {}

    signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
        return this.httpClient.patch<SignInResponse>('kidsloop-test/accounts/sign-in', [
            { op: 'test', path: '/email', value: signInRequest.email },
            { op: 'test', path: '/password', value: signInRequest.password },
        ]);
    }
}
