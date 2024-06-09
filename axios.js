//axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL, // Utiliza tu URL base aquí
  withCredentials: true // Importante para las cookies de sesión
});

export default axiosInstance;
