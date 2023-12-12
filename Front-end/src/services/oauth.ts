import { AuthResponse, LoginForm, LoginResponse, SignUpForm } from "../model/auth";
import axios, {AxiosResponse} from "axios";
import { UserCredentials } from "../model/user";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const userCredentialsNameInStorage = 'credentials'
export const oauth = async (form: SignUpForm): Promise<LoginResponse> => {
    try{
        const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/auth/google`,
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