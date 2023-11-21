
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