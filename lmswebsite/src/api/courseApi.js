import api from '../config/axiosConfig';

/**
 * Function to create a new course
 * @param {Object} courseData - The course details to be sent in the request body
 * @param {string} courseData.title - The ObjectId of the course title
 * @param {string} courseData.class - The ObjectId of the class
 * @param {number} courseData.price - The price of the course
 * @returns {Object} - The created course data from the server
 */
export const createCourse = async (courseData) => {
    try {
        const response = await api.post('/courses/createcourse', courseData);
        console.log('Course created successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error creating course:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};


/**
 * Function to get all courses
 * @returns {Array} - Array of course objects from the server
 */
export const getAllCourses = async () => {
    try {
        const response = await api.get('/courses/allcourses');
        console.log('Courses fetched successfully:', response.data);
        return response.data; // Return the array of courses
    } catch (error) {
        console.error('Error fetching courses:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to get a course by ID
 * @param {string} courseId - The ID of the course to fetch
 * @returns {Object} - The course object from the server
 */
export const getCourseById = async (courseId) => {
    try {
        const response = await api.get(`/courses/courses/${courseId}`);
        console.log('Course fetched successfully:', response.data);
        return response.data; // Return the course data
    } catch (error) {
        console.error('Error fetching course:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};


/**
 * Function to get a course by ID
 * @param {string} courseId - The ID of the course to fetch
 * @returns {Object} - The deleted course object from the server
 */
export const deleteCourseById = async (courseId) => {
    try {
        const response = await api.delete(`/courses/deletecourse/${courseId}`);
        console.log('course deleted successfully', response.data);
        return response.data;// Return the deleted course data
    } catch {
        console.error('Error fetching course:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
}

/**
 * Function to update a course by ID
 * @param {string} courseId - The ID of the course to update
 * @param {Object} courseData - The updated course details
 * @returns {Object} - The updated course object from the server
 */
export const updateCourse = async (courseId, courseData) => {
    try {
        const response = await api.put(`/courses/updatecourse/${courseId}`, courseData);
        console.log('Course updated successfully:', response.data);
        return response.data; // Return the updated course data
    } catch (error) {
        console.error('Error updating course:', error.response?.data || error.message);
        throw error; // Throw error for further handling
    }
};