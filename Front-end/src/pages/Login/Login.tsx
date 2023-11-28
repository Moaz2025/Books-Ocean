import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { useState, ChangeEvent, useEffect } from 'react';

import { getUserCredentials, isAuthenticated, login } from '../../services/auth';
import { AuthResponse, LoginForm, LoginResponse } from '../../model/auth';
import { notify } from '../signUp/SignUp';
import { UserCredentials } from '../../model/user';
import { router } from '../../services/router';
import OAuth from '../../components/OAuth';
import { useTheme } from '../ThemeTogglerProvider';
// const defaultTheme = createTheme();
const Login: React.FC = () => {
  const {theme, toggleTheme} = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const checkAuthentication = async () => {
      const route = router();
      if (route != '/login') {
        navigate(route);
      }
      setLoading(false);
    };
    checkAuthentication()
  }, [])
  const [userType, setUserType] = useState<string>('buyer');
  const handleUserTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
    console.log(userType);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form: LoginForm = {
      email: data.get('email') as string,
      password: data.get('password') as string, 
      userType: data.get('user-type')? userType : 'buyer'
    };
    login(form)
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
  };
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
            Sign in
          </Typography>
          <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl>
              <FormLabel>Login as</FormLabel>
              <RadioGroup
                aria-label="user-type"
                name="user-type"
                value={userType}
                onChange={handleUserTypeChange}
                row
              >
                <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              size='large'
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
  )
}

export default Login