export interface FormState {
    email: string;
    password: string;
}

export interface FormRegister {
    email: string;
    password: string;
    displayName: string;
}

export interface Errors {
    email: boolean,
    password: boolean,
    displayName: boolean
}