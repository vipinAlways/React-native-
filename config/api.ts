// config/api.js
import { Platform } from 'react-native';

// Get your local IP address and replace 'YOUR_IP_HERE'
const LOCAL_IP = '192.168.1.17'; // Replace with your actual IP
const PORT = '3000'; // Replace with your backend port


const API_CONFIG = {
 
  development: {
    baseURL: `http://${LOCAL_IP}:${PORT}`,
    timeout: 10000,
  },
  // For production (when you deploy)
  production: {
    baseURL: 'https://your-production-api.com',
    timeout: 30000,
  }
};

// Get current environment
const isDevelopment = __DEV__;
export const API_BASE_URL = isDevelopment 
  ? API_CONFIG.development.baseURL 
  : API_CONFIG.production.baseURL;

export const API_TIMEOUT = isDevelopment 
  ? API_CONFIG.development.timeout 
  : API_CONFIG.production.timeout;

// Helper function to construct API URLs
export const getApiUrl = (endpoint:string) => {
  return `${API_BASE_URL}/api${endpoint}`;
};

// Console log for debugging
console.log('API Base URL:', API_BASE_URL);