import { resetTokenVerification } from "./RequestInterceptor";


export const responseInterceptor = (response) => {
  console.log('✅ Success:', response.config.url);
  return response;
};

export const responseErrorHandler = (error) => {
  const { response } = error;
  
  if (response?.status === 401) {
    console.error('❌ Unauthorized (401)');
    resetTokenVerification();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    if (window.location.pathname !== '/signin') {
      window.location.href = '/signin';
    }
  }
  
  if (response?.status === 403) {
    console.error('🔒 Forbidden (403)');
  }
  
  if (response?.status === 500) {
    console.error('💥 Server error (500)');
  }
  
  return Promise.reject(error);
};