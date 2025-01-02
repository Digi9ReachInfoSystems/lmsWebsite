// src/api/notificationApi.js
import api from '../config/axiosConfig';

/**
 * Function to create a new notification
 * @param {Object} notificationData - The notification details to be sent in the request body
 * @param {Array<string>} notificationData.user_ids - Array of User ObjectIds (required if is_all is false)
 * @param {string} notificationData.message - The notification message (required)
 * @param {string} [notificationData.title] - The notification title (optional)
 * @param {boolean} [notificationData.is_all=false] - Flag to indicate if the notification is global (optional)
 * @returns {Object} - The created notification data from the server
 */
export const createNotification = async (notificationData) => {
    try {
        const response = await api.post('/notifications/', notificationData);
        // console.log('Notification created successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        // console.error('Error creating notification:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to get all notifications with optional filters
 * @param {Object} [filters] - The query parameters for filtering notifications
 * @param {string} [filters.user_id] - Filter notifications for a specific user
 * @param {boolean} [filters.is_all] - Filter global notifications
 * @returns {Array<Object>} - The list of notifications from the server
 */
export const getAllNotifications = async (filters ) => {
    try {
        const response = await api.get('/notifications/', { params: filters });
        // console.log('Notifications fetched successfully:', response.data);
        return response.data; // Return the notifications data
    } catch (error) {
        // console.error('Error fetching notifications:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to get notifications for a specific user
 * @param {string} userId - The ID of the user to fetch notifications for
 * @returns {Array<Object>} - The list of notifications for the user from the server
 */
export const getUserNotifications = async (userId) => {
    try {
        const response = await api.get(`/notifications/my/${userId}`);
        // console.log('User notifications fetched successfully:', response.data);
        return response.data; // Return the user's notifications
    } catch (error) {
        // console.error('Error fetching user notifications:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to get a single notification by ID
 * @param {string} notificationId - The ID of the notification to fetch
 * @returns {Object} - The notification object from the server
 */
export const getNotificationById = async (notificationId) => {
    try {
        const response = await api.get(`/notifications/${notificationId}`);
        // console.log('Notification fetched successfully:', response.data);
        return response.data; // Return the notification data
    } catch (error) {
        // console.error('Error fetching notification:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to update a notification by ID
 * @param {string} notificationId - The ID of the notification to update
 * @param {Object} updateData - The updated notification data
 * @param {Array<string>} [updateData.user_ids] - Array of User ObjectIds (required if is_all is false)
 * @param {string} [updateData.message] - The updated notification message (optional)
 * @param {string} [updateData.title] - The updated notification title (optional)
 * @param {boolean} [updateData.is_all] - Flag to indicate if the notification is global (optional)
 * @returns {Object} - The updated notification data from the server
 */
export const updateNotification = async (notificationId, updateData) => {
    try {
        const response = await api.put(`/notifications/${notificationId}`, updateData);
        // console.log('Notification updated successfully:', response.data);
        return response.data; // Return the updated notification data
    } catch (error) {
        // console.error('Error updating notification:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to delete a notification by ID
 * @param {string} notificationId - The ID of the notification to delete
 * @returns {Object} - The response from the server
 */
export const deleteNotification = async (notificationId) => {
    try {
        const response = await api.delete(`/notifications/${notificationId}`);
        // console.log('Notification deleted successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        // console.error('Error deleting notification:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to mark a notification as read for a specific user
 * @param {string} userId - The ID of the user marking the notification as read
 * @param {string} notificationId - The ID of the notification to mark as read
 * @returns {Object} - The response from the server
 */
export const markAsRead = async (userId, notificationId) => {
    try {
        const response = await api.patch(`/notifications/mark-as-read/${userId}`, { notification_id: notificationId });
        // console.log('Notification marked as read:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        // console.error('Error marking notification as read:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to get unread notifications for a specific user
 * @param {string} userId - The ID of the user to fetch unread notifications for
 * @returns {Array<Object>} - The list of unread notifications from the server
 */
export const getUnreadNotifications = async (userId) => {
    try {
        const response = await api.get(`/notifications/unread/${userId}`);
        // console.log('Unread notifications fetched successfully:', response.data);
        return response.data; // Return the unread notifications
    } catch (error) {
        // console.error('Error fetching unread notifications:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};
