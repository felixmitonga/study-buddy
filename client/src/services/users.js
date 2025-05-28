import axios from 'axios';

// Base URL for user-related API endpoints
const API_URL = 'http://localhost:5000/api/users';

/**
 * Updates the current user's profile information
 * @param {Object} data - The updated profile data to send to the server
 * @returns {Promise<Object>} The updated user profile data from the server
 * @throws Will throw an error if the request fails or if no token is found
 */
export const updateProfile = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/me`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

/**
 * Fetches potential study buddy matches for the current user
 * @returns {Promise<Array>} An array of potential match profiles
 * @throws Will throw an error if the request fails or if no token is found
 */
export const getPotentialMatches = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/matches`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};