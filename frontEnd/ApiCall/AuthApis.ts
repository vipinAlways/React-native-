// ApiCall/AuthApis.js
import { getApiUrl, API_TIMEOUT } from '../config/api';

// Types (if using TypeScript)
interface AuthProps {
  username?: string;
  password: string;
  email: string;
}

// Enhanced fetch with timeout and error handling
const fetchWithTimeout = async (url:string, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  console.log(url);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    
    // Handle non-200 responses
    if (!response.ok) {

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
   
    throw error;
  }
};

// Sign Up API
export const signUp = async ({ username, password, email }: AuthProps) => {
  try {
    // Validate inputs
    if (!username || !password || !email) {
      throw new Error('All fields are required');
    }

    console.log('Attempting to register with:', { username, email });
    console.log('API URL:', getApiUrl('/auth/register'));

    const response = await fetchWithTimeout(getApiUrl('/auth/register'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();
    console.log('Registration successful:', data);
    return data;
    
  } catch (error) {
    console.error('Registration error:', )    
    // Provide more specific    if (cludes('fetch')) {
      throw new Error('Cannot connect to server. Make sure your backend is running and accessible.');
    }
    
  
};

// Sign In API
export const signIn = async ({ email, password }:AuthProps) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    console.log('Attempting to login with:', { email });
    
    const response = await fetchWithTimeout(getApiUrl('/auth/login'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Login successful');
    return data;
    
  } catch (error) {
    console.error('Login error:',) 
     throw new Error( 'Login failed');
  }
};

// Get All Users API
export const getAlluser = async () => {
  try {
    console.log('Fetching all users from:', getApiUrl('/users'));
    
    const response = await fetchWithTimeout(getApiUrl('/users'), {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Users fetched successfully');
    return data;
    
  } catch (error) {
    console.error('Fetch users error:',)
         throw new Error( 'Failed to fetch users');
  }
};

// Helper function to check if server is reachable
export const checkServerHealth = async () => {
  try {
    const response = await fetchWithTimeout(getApiUrl('/health'), {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};