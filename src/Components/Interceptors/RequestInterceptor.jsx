// src/Connection/interceptors/requestInterceptor.js

import axios from 'axios';

// Verification state
let isTokenVerified = false;
let tokenVerificationInProgress = false;

// Backend se token verify
const verifyTokenWithBackend = async (token) => {
  try {
    console.log('🔍 Verifying token with backend...');
    
    const response = await axios.get('http://localhost:3000/api/verify-token', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.data.success) {
      console.log('✅ Token verified');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Verification failed:', error.response?.data?.message);
    return false;
  }
};

export const requestInterceptor = async (config) => {
  const token = localStorage.getItem('token');
  
  if (!token) return config;
  
  config.headers.Authorization = `Bearer ${token}`;
  
  // Public routes skip
  const publicRoutes = ['/login', '/verify-token'];
  if (publicRoutes.some(route => config.url?.includes(route))) {
    return config;
  }
  
  // Extra verification
  if (!isTokenVerified && !tokenVerificationInProgress) {
    tokenVerificationInProgress = true;
    
    const isValid = await verifyTokenWithBackend(token);
    
    tokenVerificationInProgress = false;
    
    if (isValid) {
      isTokenVerified = true;
    } else {
      isTokenVerified = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
      
      return Promise.reject(new Error('Token verification failed'));
    }
  }
  
  return config;
};

export const requestErrorHandler = (error) => {
  tokenVerificationInProgress = false;
  return Promise.reject(error);
};

// Reset function (export for logout)
export const resetTokenVerification = () => {
  isTokenVerified = false;
  tokenVerificationInProgress = false;
};