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
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { useState, ChangeEvent } from 'react';

import { login } from '../../services/auth';
import { AuthResponse, LoginForm } from '../../model/auth';
import { notify } from '../signUp/SignUp';
const defaultTheme = createTheme();
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>('buyer');
  const handleUserTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
    console.log(userType);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      type: data.get('user-type')
    });
    const form: LoginForm = {
      email: data.get('email') as string,
      password: data.get('password') as string, 
      userType: data.get('user-type')? userType : 'buyer'
    };
    login(form)
      .then((responce: AuthResponse) => {
        if(responce.status! < 300){
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
        
        notify('Registeration failure', 'error');
      })
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
