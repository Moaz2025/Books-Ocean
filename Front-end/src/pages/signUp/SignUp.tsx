import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUp } from '../../services/auth';
import { AuthResponse, SignUpForm } from '../../model/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import {useState, useEffect} from 'react'
import { router } from '../../services/router';
import { CircularProgress } from '@mui/material';
import OAuth from '../../components/OAuth';
import { useTheme } from '../ThemeTogglerProvider';
// const defaultTheme = createTheme();
export const notify = (notification:string, type?: string) => {
    switch (type) { 
        case 'success':
          toast.success(notification)
          break;
        case 'error':
          toast.error(notification)
          break;
        default:
          toast.info(notification)
          break;
    } 
}
export default function SignUp() {
  const navigate = useNavigate();
  const {theme, toggleTheme} = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form: SignUpForm = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string, 
    };
    signUp(form)
      .then((responce: AuthResponse) => {
        notify(responce.message!, responce.type);
        if(responce.status! < 300 || responce.type == 'success'){
          const routing = setTimeout(
            ()=>{
              navigate('/login')
            },3000
          )
        }
      })
      .catch((error) => {
        notify('Registeration failure', 'error');
      })
  };
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const checkAuthentication = async () => {
      const route = router();
      if (route != '/signup' && route != '/login') {
        navigate(route);
      }
      setLoading(false);
    };
    checkAuthentication()
  }, [])
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size='large'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{mt: 1}}>
            <h3 style={{textAlign: 'center'}}>Or</h3>
            <OAuth />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
