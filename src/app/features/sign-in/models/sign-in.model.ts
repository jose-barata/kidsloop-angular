export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    id: string;
    name: string;
    token: {
        access: string;
        refresh: string;
        type: string;
        expires: number;
    };
}
