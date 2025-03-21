import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'http://localhost:5001/api';

/**
 * @function apiRequest
 * @description Handles API requests with authentication token
 * @param {string} endpoint - API endpoint (e.g., "socialApp")
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} [data={}] - Request body data (default empty object)
 * @returns {Promise} - Axios response
 */
export const apiRequest = async (endpoint, method = 'GET', data = {}) => {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.token) {
      throw new Error('User not authenticated');
    }

    const token = userData.token;

    const response = await axios({
      url: `${API_BASE_URL}/${endpoint}`,
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Return response data
  } catch (error) {
    console.error(`API Request Error: ${error.response?.data?.error || error.message}`);
    throw error; // Throw error for handling in components
  }
};
