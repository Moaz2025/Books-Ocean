import { Button } from '@mui/material';
import { isAuthenticated } from '../../services/auth'
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { logout } from '../../services/auth';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleLogout = () =>{
    logout()
    navigate('/login')
  }
  useEffect(()=>{
    const checkAuthentication = async () => {
      const isLoggedIn = isAuthenticated();
      console.log("Logged in == ", isLoggedIn);
      
      if (!isLoggedIn) {
        navigate('/login');
      }

      setLoading(false);
    };
    const loader = setTimeout(
      ()=>{
        checkAuthentication()
      }
      ,1000
    )
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
