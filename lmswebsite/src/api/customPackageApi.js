import api from "./axiosConfig";

export const createCustomPackage = async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.post("/customPackages/", responseData);
        console.log("Custom Package created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating Custom Package:", error.response?.data || error.message);     
    }

}