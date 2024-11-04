import api from "../config/axiosConfig";

/**
 * Function to fetch statistics data.
 * @returns {Promise<Object>} - The response data containing statistics.
 */
export const getStatisticsData = async () => {
    try {
      // Make the GET request
      const response = await api.get('/stats/statistics');
      
      console.log('Statistics data fetched successfully:', response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error fetching statistics data:', error.response?.data || error.message);
      throw error; // Throw the error for further handling
    }
  };