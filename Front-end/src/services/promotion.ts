import axios, {AxiosError, AxiosResponse} from "axios";
import { GetBuyersResponse, IBuyer, UserCredentials } from "../model/user";
import { getUserCredentials } from "./auth";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const userCredentialsNameInStorage = 'credentials'
const buyers : IBuyer[] = [
  {
    firstName:'hassan',
    lastName:'ahmed',
    email:'hassan@gmail.com',
    password:'',
  },
  {
    firstName:'moaz',
    lastName:'ahmed',
    email:'moaz@gmail.com',
    password:'',
  },
  {
    firstName:'ali',
    lastName:'ahmed',
    email:'ali@gmail.com',
    password:'',
  },{
    firstName:'omar',
    lastName:'ahmed',
    email:'omar@gmail.com',
    password:'',
  }
]
export const getAllBuyers = async (): Promise<IBuyer[]> => {
    try {
        const token = getUserCredentials()?.token; // Replace with your actual access token
        const response: AxiosResponse<GetBuyersResponse> = await axios.get(`${API_URL}/promotion/getAllBuyers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Handle the response data here
        console.log(response.data);
        return response.data.buyersList? response.data.buyersList : [];
      } catch (error) {
        // Handle errors here
        console.error('Error fetching buyers:', error);
        return buyers;
      }
};

export const promoteBuyer = async (userEmail: string): Promise<string> => {
    try {
        const token = getUserCredentials()?.token; // Replace with your actual access token
        console.log(userEmail)
        const response: AxiosResponse = await axios.post(`${API_URL}/promotion/promoteAdmin`, userEmail, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        // Handle the response data here
        console.log(response.data);
        return (response.data);
      } catch (error : any) {
        // Handle errors here
        console.error('Error Adding Book:', error);
        return error.response.data
      }
};