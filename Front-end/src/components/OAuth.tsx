import { Button } from '@mui/material'
import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import { notify } from '../pages/signUp/SignUp';
import { LoginForm, LoginResponse, SignUpForm } from '../model/auth';
import { oauth } from '../services/oauth';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId='1071939016827-kocbt3qmb627rs6igp8n8gbc9166rnsa.apps.googleusercontent.com'>
      <ToastContainer />
      <GoogleLogin
        size='large'
        text='continue_with'
        onSuccess={credentialResponse => {
          // var decode = jwtDecode(credentialResponse.credential!)
          const decode = jwtDecode(credentialResponse.credential!) as { email: string, family_name: string,given_name: string  };
          const form: SignUpForm = {
            email: decode.email as string,
            password: '', 
            firstName: decode.given_name,
            lastName: decode.family_name
          };
          console.log(form)
          navigate('/home')
          oauth(form) 
          .then((responce: LoginResponse) => {
            if(responce.status! < 300){
              navigate('/home');
            }else{          
              notify(responce.message? responce.message : 'Login failed', 'error');
            }
          })
          .catch((error) => {
            console.log(error);
            notify('Login failure', 'error');
          })
          // notify(decode.sub!,'success')
        }}
        onError={()=>{
          console.log('Login failed')
        }}
      />
    </GoogleOAuthProvider>
  )
}

export default OAuth
