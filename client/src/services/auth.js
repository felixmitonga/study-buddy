import axios from 'axios';

// Base URL for authentication API endpoints
const API_URL = 'http://localhost:5000/api/auth';

/**
 * Register a new user with the study buddy application
  */
export const register = async (name, email, password, university, major, year) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    university,
    major,
    year
  });
  return response.data;
};

/**
 * Authenticate an existing user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {object} Response data containing user info and auth token
 */
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

/**
 * Fetch the currently authenticated user's profile
 * @returns {object} Current user's data
 * @throws {Error} If no authentication token is found
 */
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await axios.get('http://localhost:5000/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};