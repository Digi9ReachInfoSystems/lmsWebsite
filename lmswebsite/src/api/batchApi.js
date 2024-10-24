import api from "./axiosConfig";

export const createBatch = async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.post("/batches/", responseData);
        console.log("Batch created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating batch:", error.response?.data || error.message);
    }
};

export const getAllBatches = async () => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get("/batches/getAllBatches");
        console.log("Batches fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching batches:", error.response?.data || error.message);
    }
};

