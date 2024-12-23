import api from '../config/axiosConfig';

// Function to get user by auth_id
export const getUserByAuthId = async (authId) => {
    try {
        const response = await api.get('/users/userByAuthId', {
            headers: {
                auth_id: authId, // Pass the auth_id in headers
            },
        });
        return response.data; // Return the user data from the API response
    } catch (error) {
        ////console.error('Error fetching user by auth_id:', error);
        throw error; // Re-throw error for further handling if needed
    }
};

// Function to get user profile by auth_id
export const getUserProfile = async (authId) => {
    try {
        const response = await api.get('/users/profile', {
            headers: {
                auth_id: authId, // Pass the auth_id in headers
            },
        });
        return response.data; // Return user profile data
    } catch (error) {
        ////console.error('Error fetching user profile:', error);
        throw error; // Re-throw the error for handling
    }
};

export const updateUserByAuthId = async (authId,updateData) => {
    try {
        const response = await api.put('/users/updateProfile', updateData,{
            headers: {
                auth_id: authId, // Pass the auth_id in headers
            },
        });
        return response.data; // Return the user data from the API response
    } catch (error) {
        ////console.error('Error fetching user by auth_id:', error);
        throw error; // Re-throw error for further handling if needed
    }
};
