// src/Connection/Api.js

import axios from 'axios';
import { requestErrorHandler, requestInterceptor } from '../Interceptors/RequestInterceptor';
import { responseErrorHandler, responseInterceptor } from '../Interceptors/ResponseInterceptor';

const axiosinstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// Add interceptors
axiosinstance.interceptors.request.use(requestInterceptor, requestErrorHandler);
axiosinstance.interceptors.response.use(responseInterceptor, responseErrorHandler);

export default axiosinstance;
