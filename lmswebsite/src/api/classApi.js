import api from '../config/axiosConfig';

/**
 * Function to update a class by its ID
 * @param {string} classId - The ID of the class to update
 * @param {Object} updatedData - The new data for the class
 * @param {string} updatedData.className - The name of the class (e.g., "Physics")
 * @param {number} updatedData.classLevel - The level of the class (e.g., 11)
 * @param {string} updatedData.curriculum - The curriculum followed (e.g., "CBSE")
 * @returns {Object} - The created class data from the API
 */
// Function to create a new class
export const createClass = async (classData) => {
    try {
        const response = await api.post('/classes', classData);
        console.log('Class created successfully:', response.data);
        return response.data; // Return the created class data
    } catch (error) {
        console.error('Error creating class:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};
// Function to fetch all classes
export const getAllClasses = async () => {
    try {
        const response = await api.get('/classes');
        console.log('Fetched classes:', response.data);
        return response.data; // Return fetched classes
    } catch (error) {
        console.error('Error fetching classes:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};

// Function to delete a class by its ID
export const deleteClass = async (classID) => {
    try {
        const response = await api.delete(`/classes/${classID}`);
        console.log(`Class with ID ${classID} deleted successfully.`);
        return response.data; // Return the response if needed
    } catch (error) {
        console.error('Error deleting class:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};

/**
 * Function to update a class by its ID
 * @param {string} classId - The ID of the class to update
 * @param {Object} updatedData - The new data for the class
 * @param {string} updatedData.className - The name of the class (e.g., "Physics")
 * @param {number} updatedData.classLevel - The level of the class (e.g., 11)
 * @param {string} updatedData.curriculum - The curriculum followed (e.g., "CBSE")
 * @returns {Object} - The updated class data from the API
 */
// Function to update a class by its ID
export const updateClass = async (classId, updatedData) => {
    try {
      const response = await api.put(`/classes/${classId}`, updatedData);
      console.log(`Class with ID ${classId} updated successfully.`);
      return response.data; // Return the updated class data
    } catch (error) {
      console.error('Error updating class:', error.response?.data || error.message);
      throw error; // Throw error for further handling
    }
  };