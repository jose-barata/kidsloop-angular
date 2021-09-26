import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPasswordResponse } from '../models/reset-password.model';

@Injectable()
export class ResetPasswordService {
    constructor(private httpClient: HttpClient) {}

    resetPassword(email: string): Observable<ResetPasswordResponse> {
        return this.httpClient.post<ResetPasswordResponse>('kidsloop-test/accounts/reset-password', email);
    }
}
