import { AuthResponse, LoginForm, LoginResponse, SignUpForm } from "../model/auth";
import axios, {AxiosResponse} from "axios";
import { UserCredentials } from "../model/user";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const userCredentialsNameInStorage = 'credentials'

export const login = async (form: LoginForm): Promise<LoginResponse> => {
    // Just for testing !!
    // var userCredits:UserCredentials;
    // userCredits = {
    //     userType: form.userType,
    //     id: 12,
    //     token: 'kfhen1547'
    // }
    // localStorage.setItem(userCredentialsNameInStorage, JSON.stringify(userCredits));
    try{
        const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/auth/login`,
            JSON.stringify(form),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            } 
        );
        const authResponse: LoginResponse = {
            status: response.status,
            credentials: response.data.credentials,
            message: response.data.message
        };
        const credits: UserCredentials = authResponse.credentials!;
        localStorage.setItem(userCredentialsNameInStorage, JSON.stringify(credits));
        return authResponse;
    }catch(error:any){
        console.error('Login Failure: ', error);
        const authResponse: LoginResponse = {
            status: 500,
            message: 'Server error'
        };
        
        return authResponse
    }

}

export const logout = (): void => {
    localStorage.removeItem(userCredentialsNameInStorage);
    try{
        axios.post(`${API_URL}/auth/logout`)
    }catch(error:any){
        console.error(error)
    }

};

export const isAuthenticated = (): boolean => {
    const credits = localStorage.getItem(userCredentialsNameInStorage);

    return !credits?.toLowerCase().includes('undefined');
};

export const getUserCredentials = (): UserCredentials | null => {
    if(isAuthenticated()){
        const credits: UserCredentials = JSON.parse(localStorage.getItem(userCredentialsNameInStorage)!);
        return credits
    }
    return null;
};

export const signUp = async (form: SignUpForm): Promise<AuthResponse> => {
    let firstName = form.firstName
    let lastName = form.lastName
    let email = form.email
    let password = form.password
    
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(`${API_URL}/auth/signup`,
            JSON.stringify(form),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            } 
        );
        const authResponse: AuthResponse = {
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
