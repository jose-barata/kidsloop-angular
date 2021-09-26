export interface SignUpRequest {
    email: string;
    password: string;
}

export interface SignUpResponse {
    id: string;
    name: string;
    token: {
        access: string;
        refresh: string;
        type: string;
        expires: number;
    };
}
