import api from "../config/axiosConfig";

export const createBatch = async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.post("/batches/", responseData);
        console.log("Batch created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating batch:", error.response?.data || error.message);
    }
};

/**
 * Fetch all batches with optional query parameters.
 * @param {Object} params - Query parameters (e.g., page, limit, start_date, end_date, teacher_id, etc.)
 * @returns {Promise<Object>} - Returns the response data or logs an error.
 */
export const getAllBatches = async (params = {}) => {
    try {
      // Call the backend API using Axios with query params
      const response = await api.get('/batches/getAllBatches', { params });
  
      console.log('Batches fetched successfully:', response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error fetching batches:', error.response?.data || error.message);
      throw error; // Optionally rethrow the error for further handling
    }
  };

