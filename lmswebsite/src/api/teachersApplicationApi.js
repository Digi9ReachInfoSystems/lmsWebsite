import api from '../config/axiosConfig';

/**
 * Function to submit a teacher application
 * @param {Object} applicationData - The application data including file and text fields
 * @param {File} applicationData.resume - The resume file to upload
 * @param {string} applicationData.state - The state of the applicant
 * @param {string} applicationData.city - The city of the applicant
 * @param {string} applicationData.pincode - The pincode of the applicant
 * @param {string} applicationData.current_position - The current position of the applicant
 * @param {string} applicationData.language - The language of the applicant
 * @returns {Object} - The response from the server
 */
export const submitTeacherApplication = async (applicationData) => {
    const formData = new FormData();

    // Append form data
    formData.append('resume', applicationData.resume);
    formData.append('state', applicationData.state);
    formData.append('city', applicationData.city);
    formData.append('pincode', applicationData.pincode);
    formData.append('current_position', applicationData.current_position);
    formData.append('language', applicationData.language);

    try {
        const response = await api.post('/teacher-application/apply', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type for file upload
            },
        });
        console.log('Application submitted successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error submitting application:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
 * Function to fetch teacher applications with an optional approval status
 * @param {string} approvalStatus - The approval status to filter applications
 * @returns {Object} - The response from the server containing teacher applications
 */
export const getTeacherApplications = async (approvalStatus) => {
    try {
        const response = await api.get('/teacher-application', {
            params: {
                approval_status: approvalStatus, // Set the approval status as a query parameter
            },
        });
        console.log('Teacher applications fetched successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching teacher applications:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};

/**
* Function to approve a teacher application by application ID
* @param {string} applicationId - The ID of the teacher application to approve
* @returns {Object} - The response from the server after approval
*/
export const approveTeacherApplication = async (applicationId) => {
    try {
        const response = await api.put(`/teacher-application/approve/${applicationId}`);
        console.log('Teacher application approved successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error approving teacher application:', error.response?.data || error.message);
        throw error; // Throw the error for further handling
    }
};
