import { Token } from "typescript";
import { UserCredentials } from "./user";

export interface AuthResponse{
    //type: success | error etc
    type?: string;
    message?: string;
    token?: string;
    status?:number;
}

export interface LoginForm{
    email: string;
    password: string;
    userType: string;
}

export interface SignUpForm{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginResponse {
    status?: number
    message?: string
    userType?:string
    email?:string
    token?:string
}