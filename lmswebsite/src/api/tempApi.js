import api from '../config/axiosConfig'; // Import your Axios instance

/**
 * Function to refresh the access token by calling the backend API.
 * @param {string} refreshToken - The refresh token value.
 * @returns {Promise<Object>} - Returns the API response containing the new access token.
 */
export const refreshAccessToken = async (refreshToken) => {
  try {
    // Call the API with the refresh token in the header
    const response = await api.post(
      '/temp/refresh-token', // Endpoint path (baseURL is already configured)
      {}, // No request body needed
      {
        headers: {
          'x-refresh-token': refreshToken, // Add refresh token in headers
        },
      }
    );

    // Return the API response data
    return response.data;
  } catch (error) {
    console.error('Error refreshing access token:', error.message);

    // Handle error based on response
    if (error.response) {
      return error.response.data; // Return the error data from response
    } else {
      throw new Error('Network or server error'); // Handle network errors
    }
  }
};
