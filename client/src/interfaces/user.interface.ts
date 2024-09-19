export interface User {
    name: string;
    email: string;
    phone: string;
    password: string;
    id: number;
}

export interface SignInData {
    email: string,
    password: string,
}