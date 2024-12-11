import api from '../config/axiosConfig';
import { uploadFileToFirebase } from '../utils/uploadFileToFirebase';

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



export const createClass = async (responseData) => {
    try {
        if (!responseData.imageLink || !responseData.imageLink.name) {
            throw new Error("No valid image file provided.");
        }

        // Upload file to Firebase and get the download URL
        const downloadURL = await uploadFileToFirebase(responseData.imageLink, "classImages");

        // Replace imageLink with the actual download URL
        const submissionData = { ...responseData, imageLink: downloadURL };

        console.log("Final submission data:", submissionData);

        // API POST request
        const response = await api.post('/classes/', submissionData);
        console.log('Class created successfully:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error creating class:', error.response?.data || error.message);
        throw error;
    }
};


export const getClassesByBoardId = async (boardId) => {
    try {
        const response = await api.get(`/classes/board/${boardId}`);
        console.log('Fetched classes by board ID:', response.data);
        return response.data; // Return fetched classes
    } catch (error) {
        console.error('Error fetching classes by board ID:', error.response?.data || error.message);
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

