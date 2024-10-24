import api from '../config/axiosConfig';

/**
 * Function to create a new time slot
 * @param {Object} timeSlotData - The time slot details to be sent in the request body
 * @param {Object} timeSlotData.time_slot - The time slot object
 * @param {string} timeSlotData.time_slot.start - The start time in ISO 8601 format
 * @param {string} timeSlotData.time_slot.end - The end time in ISO 8601 format
 * @returns {Object} - The created time slot data from the server
 */
export const createTimeSlot = async (timeSlotData) => {
    try {
        const response = await api.post('/timeslots/create', timeSlotData);
        console.log('Time slot created successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error creating time slot:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to get a time slot by ID
 * @param {string} timeSlotId - The ID of the time slot to fetch
 * @returns {Object} - The time slot object from the server
 */
export const getTimeSlotById = async (timeSlotId) => {
    try {
        const response = await api.get(`/timeslots/gettimeslot/${timeSlotId}`);
        console.log('Time slot fetched successfully:', response.data);
        return response.data; // Return the time slot data
    } catch (error) {
        console.error('Error fetching time slot:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
* Function to get time slots based on query parameters
* @param {Object} query - The query parameters for the API request
* @param {string} query.startDate - The start date for filtering time slots
* @param {string} query.endDate - The end date for filtering time slots
* @param {string} query.approvalStatus - The approval status for filtering time slots
* @returns {Object} - The list of time slots from the server
*/
/*
   query = {
      startDate: '2023-10-01', // Example start date
       endDate: '2023-10-31', // Uncomment if needed
       approvalStatus: 'approved' // Uncomment if needed
    };
 */
export const getTimeSlots = async (query) => {
    try {
        const response = await api.get('/timeslots/gettimeslots', { params: query });
        console.log('Time slots fetched successfully:', response.data);
        return response.data; // Return the time slots data
    } catch (error) {
        console.error('Error fetching time slots:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};


/**
 * Function to update a time slot by ID
 * @param {string} timeSlotId - The ID of the time slot to update
 * @param {Object} timeSlotData - The updated time slot data
 * @param {Object} timeSlotData.time_slot - The time slot object
 * @param {string} timeSlotData.time_slot.start - The new start time in ISO 8601 format
 * @param {string} timeSlotData.time_slot.end - The new end time in ISO 8601 format
 * @param {string} timeSlotData.approval_status - The new approval status
 * @returns {Object} - The updated time slot data from the server
 */
export const updateTimeSlot = async (timeSlotId, timeSlotData) => {
    try {
        const response = await api.put(`/timeslots/update/${timeSlotId}`, timeSlotData);
        console.log('Time slot updated successfully:', response.data);
        return response.data; // Return the updated time slot data
    } catch (error) {
        console.error('Error updating time slot:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to delete a time slot by ID
 * @param {string} timeSlotId - The ID of the time slot to delete
 * @returns {Object} - The response from the server
 */
export const deleteTimeSlot = async (timeSlotId) => {
    try {
        const response = await api.delete(`/timeslots/delete/${timeSlotId}`);
        console.log('Time slot deleted successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error deleting time slot:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};