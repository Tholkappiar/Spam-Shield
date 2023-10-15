import React from 'react'
import { Navigate } from 'react-router-dom';

const UserAuth = () => {
    const Token = localStorage.getItem('jwtToken') !== null;
    // const isTokenValid = typeof token === 'string' && token.trim() !== '' && token !== '[object Object]';
    // const Role =  localStorage.getItem('Role') === "CUSTOMER";

  return (
    Token ? <Navigate to='/dash'  /> : <Navigate to='/login' />
  )
}

export default UserAuth