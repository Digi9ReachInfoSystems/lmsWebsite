import api from '../config/axiosConfig';

/**
 * Function to submit feedback for a teacher
 * @param {Object} feedbackData - The feedback data to submit
 * @param {string} feedbackData.teacher_id - The ID of the teacher
 * @param {string} feedbackData.student_id - The ID of the student
 * @param {string} feedbackData.batch_id - The ID of the batch
 * @param {string} feedbackData.feedback_text - The feedback text
 * @returns {Object} - The response from the server
 */
export const createFeedback = async (feedbackData) => {
    try {
        const response = await api.post('/feedback/createfeedback', feedbackData);
        //console.log('Feedback submitted successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        //console.error('Error submitting feedback:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to fetch all feedback
 * @returns {Array} - The response data containing all feedback
 */
export const getAllFeedback = async () => {
    try {
        const response = await api.get('/feedback/');
        //console.log('Feedback fetched successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        //console.error('Error fetching feedback:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to fetch feedback by ID
 * @param {string} feedbackId - The ID of the feedback to retrieve
 * @returns {Object} - The response data containing the feedback
 */
export const getFeedbackById = async (feedbackId) => {
    try {
        const response = await api.get(`/feedback/${feedbackId}`);
        //console.log('Feedback fetched successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        //console.error('Error fetching feedback:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to fetch feedback by batch ID
 * @param {string} batchId - The ID of the batch to retrieve feedback for
 * @returns {Array} - The response data containing feedback for the specified batch
 */
export const getFeedbackByBatchId = async (batchId) => {
    try {
        const response = await api.get(`/feedback/batch/${batchId}`);
        //console.log('Feedback fetched successfully for batch:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        //console.error('Error fetching feedback by batch ID:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to fetch feedback by teacher ID
 * @param {string} teacherId - The ID of the teacher to retrieve feedback for
 * @returns {Array} - The response data containing feedback for the specified teacher
 */
export const getFeedbackByTeacherId = async (teacherId) => {
    try {
        const response = await api.get(`/feedback/teacher/${teacherId}`);
        //console.log('Feedback fetched successfully for teacher:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        //console.error('Error fetching feedback by teacher ID:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};