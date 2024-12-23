// src/api/assignmentApi.js

import api from "../config/axiosConfig";

/**
 * Create a new Assignment.
 * @param {Object} assignmentData - The assignment data (e.g., { batch_id, teacher_id, content_url, expiry_date }).
 * @returns {Object} The created assignment data from the response.
 */
export const createAssignment = async (assignmentData) => {
  try {
    const response = await api.post("/assignments/", assignmentData);
    //console.log("Assignment created successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error creating assignment:", error.response?.data || error.message);
    throw error; // Re-throw if you want to handle it elsewhere
  }
};

/**
 * Edit (update) an existing Assignment.
 * @param {String} assignmentId - The ID of the assignment to edit.
 * @param {Object} updatedData - The updated assignment fields (e.g., { content_url, expiry_date }).
 * @returns {Object} The updated assignment data from the response.
 */
export const editAssignment = async (assignmentId, updatedData) => {
  try {
    const response = await api.put(`/assignments/${assignmentId}`, updatedData);
    //console.log("Assignment updated successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error editing assignment:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete an existing Assignment.
 * @param {String} assignmentId - The ID of the assignment to delete.
 * @returns {Object} The deleted assignment data from the response.
 */
export const deleteAssignment = async (assignmentId) => {
  try {
    const response = await api.delete(`/assignments/${assignmentId}`);
    //console.log("Assignment deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error deleting assignment:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get an Assignment by ID.
 * @param {String} assignmentId - The ID of the assignment to fetch.
 * @returns {Object} The assignment data from the response.
 */
export const getAssignmentById = async (assignmentId) => {
  try {
    const response = await api.get(`/assignments/${assignmentId}`);
    //console.log("Assignment fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error fetching assignment by ID:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get all Assignments (without pagination).
 * @returns {Object} The list of all assignments from the response.
 */
export const getAllAssignments = async () => {
  try {
    const response = await api.get("/assignments/");
    //console.log("All assignments fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error fetching all assignments:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get Assignments by Teacher ID (without pagination).
 * @param {String} teacherId - The ID of the teacher.
 * @returns {Object} The list of assignments from the response.
 */
export const getAssignmentsByTeacherId = async (teacherId) => {
  try {
    const response = await api.get(`/assignments/teacher/${teacherId}`);
    //console.log("Assignments by teacher fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error fetching assignments by teacher ID:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get Assignments by Batch ID (without pagination).
 * @param {String} batchId - The ID of the batch.
 * @returns {Object} The list of assignments from the response.
 */
export const getAssignmentsByBatchId = async (batchId) => {
  try {
    const response = await api.get(`/assignments/batch/${batchId}`);
    //console.log("Assignments by batch fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error fetching assignments by batch ID:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a student response to an existing Assignment.
 * @param {String} assignmentId - The ID of the assignment.
 * @param {Object} responseData - The response data (e.g., { student_id, response_url, submission_date }).
 * @returns {Object} The updated assignment data from the response.
 */
export const addStudentResponse = async (assignmentId, responseData) => {
  try {
    const response = await api.post(`/assignments/${assignmentId}/responses`, responseData);
    //console.log("Student response added successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error adding student response:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a student response from an existing Assignment.
 * @param {String} assignmentId - The ID of the assignment.
 * @param {String} studentId - The ID of the student whose response should be deleted.
 * @returns {Object} The updated assignment data from the response.
 */
export const deleteStudentResponse = async (assignmentId, studentId) => {
  try {
    const response = await api.delete(`/assignments/${assignmentId}/responses/${studentId}`);
    //console.log("Student response deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error deleting student response:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update a student response in an existing Assignment.
 * @param {String} assignmentId - The ID of the assignment.
 * @param {String} studentId - The ID of the student whose response should be updated.
 * @param {Object} updatedResponseData - The updated response data (e.g., { response_url, submission_date }).
 * @returns {Object} The updated assignment data from the response.
 */
export const updateStudentResponse = async (assignmentId, studentId, updatedResponseData) => {
  try {
    const response = await api.put(
      `/assignments/${assignmentId}/responses/${studentId}`,
      updatedResponseData
    );
    //console.log("Student response updated successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error updating student response:", error.response?.data || error.message);
    throw error;
  }
};
