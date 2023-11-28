import { Button } from '@mui/material';
import { isAuthenticated } from '../../services/auth'
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { logout } from '../../services/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { router } from '../../services/router';
import { useTheme } from '../ThemeTogglerProvider';

const Home = () => {
  const {theme, toggleTheme} = useTheme();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const handleLogout = () =>{
    logout().then(()=>{
      navigate('/login')
    })
  }
  useEffect(()=>{
    const checkAuthentication = async () => {
      const route = router();
      if (route != '/home') {
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
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default Home
