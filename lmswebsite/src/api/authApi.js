
import api from "../config/axiosConfig";

export const signupUser = async ( data) => {
  try {
    
    console.log(data);
    // Construct the request body
    console.log("inside signup", data);
    const requestBody = {
      role: data.role || undefined, // Optional
      access_token: data.access_token || undefined, // Optional
      refresh_token: data.refresh_token || undefined, // Optional
      class_id: data.class_id || undefined, // Optional
      subject_id: data.subject_id || undefined, // Optional
      phone_number: data.phone_number || undefined, // Optional
      profile_image: data.profile_image || undefined, // Optional
      student_name: data.student_name || undefined, // Optional
      studentGender: data.studentGender || undefined, // Optional
      studentDOB: data.studentDOB || undefined, // Optional
      board_id: data.board_id || undefined,
    };

    // Filter out undefined values from the request body
    const filteredBody = Object.fromEntries(
      Object.entries(requestBody).filter(([_, v]) => v !== undefined)
    );

    // Make the Axios request
    const response = await api.post('/auth/signup', filteredBody);

    // Handle successful response
    console.log('Signup successful:', response.data);
    return response.data; // Return data to the calling function
  } catch (error) {
    // Handle errors
    console.error('Error during signup:', error.response?.data || error.message);
    throw error; // Throw error to handle it higher up if needed
  }
};
