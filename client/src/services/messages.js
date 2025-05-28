import axios from 'axios';

// Base URL for message-related API endpoints
const API_URL = 'http://localhost:5000/api/messages';

/**
 * Sends a new message to another user
 * @param {string} recipientId - The ID of the user receiving the message
 * @param {string} content - The message content/text
 * @returns {Promise<Object>} The sent message data from the server
 * @throws Will throw an error if unauthorized or request fails
 */
export const sendMessage = async (recipientId, content) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, { recipientId, content }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

/**
 * Retrieves the conversation history with a specific user
 * @param {string} userId - The ID of the user to get conversation history with
 * @returns {Promise<Array>} Array of message objects in the conversation
 * @throws Will throw an error if unauthorized or request fails
 */
export const getConversation = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};