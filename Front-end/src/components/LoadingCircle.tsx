import { CircularProgress } from '@mui/material';
import React from 'react'

const LoadingCircle = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </div>
  )
}

export default LoadingCircle
