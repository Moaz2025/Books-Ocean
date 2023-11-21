import { AuthResponse, LoginForm, SignUpForm } from "../model/auth";
import axios, {AxiosResponse} from "axios";
const API_URL = process.env.API_URL || 'http://localhost:8080';

export const login = async (form: LoginForm): Promise<AuthResponse> => {
    // Just for testing !!
    localStorage.setItem('token', 'testing login');
    try{
        const response: AxiosResponse<AuthResponse> = await axios.post(`${API_URL}/auth/login`,
            JSON.stringify(form),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            } 
        );
        
        const authResponse: AuthResponse = {
            token: response.data.token,
            status: response.status,
            message: response.data.message,
        };
        localStorage.setItem('token', authResponse.token!);
        return authResponse;
    }catch(error:any){
        console.error('Login Failure: ', error);
        const authResponse: AuthResponse = {
            type: 'success',
            message: 'Sign in failure',
        };
        return authResponse
    }

}

export const logout = (): void => {
    localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    return !!token;
};

export const signUp = async (form: SignUpForm): Promise<AuthResponse> => {
    let firstName = form.firstName
    let lastName = form.lastName
    let email = form.email
    let password = form.password
    console.log({
        firstName,
        lastName,
        email,
        password,
    });
    if(firstName.length < 3 || lastName.length < 3){
        const response: AuthResponse = {
            type: 'error',
            message: 'Name length must be >= 3'
        };
        return response
    }
    if(email.length <= 3 ){
        const response: AuthResponse = {
            type: 'error',
            message: 'Enter a valid e-mail'
        };
        return response
    }
    if(password.length < 8){
        const response: AuthResponse = {
            type: 'error',
            message: 'Password length must be >= 8 length'
        };
        return response
    }
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(`${API_URL}/auth/signup`,
            JSON.stringify(form),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            } 
        );
        const authResponse: AuthResponse = {
          token: response.data.token,
          status: response.status,
          message: response.data.message,
          type: response.status < 300 ? 'success' : 'error'
        };
        return authResponse;
      } catch (error: any) {
        console.error('Signup error:', error.message);
        const authResponse: AuthResponse = {
            type: 'error',
            message: 'Sign Up failure due to server issue',
        };
        return authResponse
      }
};
