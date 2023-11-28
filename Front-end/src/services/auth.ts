import { AuthResponse, LoginForm, LoginResponse, SignUpForm } from "../model/auth";
import axios, {AxiosResponse} from "axios";
import { UserCredentials } from "../model/user";
import { json } from "stream/consumers";
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
            status: response.status!,
            email: response.data.email!,
            userType: response.data.userType!,
            token: response.data.token!,
            message: response.data.message!
        };
        
        const credits: UserCredentials = {
            email: authResponse.email!,
            userType: authResponse.userType!,
            token: authResponse.token!
        };
        
        localStorage.setItem(userCredentialsNameInStorage, JSON.stringify(credits));
        
        return authResponse;
    }catch(error:any){
        console.error('Login Failure: ', error);
        const authResponse: LoginResponse = {
            status: error.response.status,
            message: error.response.data.message,
        };
        return authResponse
    }

}

export const logout = async (): Promise<void> => {
    const credits = JSON.parse(localStorage.getItem(userCredentialsNameInStorage)!);
    try{
        console.log("credits = logout ,", credits);
        
        const response = await axios.post(`${API_URL}/auth/logout`,
            JSON.stringify(credits),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            } 
        );
        console.log(response);
        localStorage.removeItem(userCredentialsNameInStorage);
        
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
          message:JSON.stringify(response.data),
          type: response.status < 300 ? 'success' : 'error'
        };
        console.log(response);
        
        return authResponse;
      } catch (error: any) {
        console.error('Signup error:', error);
        const authResponse: AuthResponse = {
            status: error.response.status,
            message: JSON.stringify(error.response.data),
            type: error.response.status < 300 ? 'success' : 'error'
          };
        console.log("error = ", authResponse);
          
        return authResponse
      }
};
