import api from "../config/axiosConfig";

export const createTypeOfBatch = async (data) => {
    try{
        const response = await api.post("/typeOfBatch/create", data);
    ////console.log("Type of batch created successfully:", response.data);
    
    return response.data;
    }
    catch(error){
        ////console.error("Error creating type of batch:", error.response?.data || error.message);
    }
};

export const getTypeOfBatchById = async (id) => {
    try {
        const response = await api.get(`/typeOfBatch/${id}`);
        //console.log("Type of batch fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error fetching type of batch:", error.response?.data || error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 getAllTypeOfBatches = async () => {
    try {
        const response = await api.get("/typeOfBatch/");
        //console.log("All type of batches fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error fetching all type of batches:", error.response?.data || error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const updateTypeOfBatch = async (id, data) => {
    try {
        const response = await api.put(`/typeOfBatch/${id}`, data);
        //console.log("Type of batch updated successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error updating type of batch:", error.response?.data || error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const discountTypeOfBatch = async (id, data) => {
    try {
        const response = await api.put(`/typeOfBatch/${id}/discount`, data);
        //console.log("Type of batch discounted successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error discounting type of batch:", error.response?.data || error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const deleteTypeOfBatch = async (id) => {
    try {
        const response = await api.delete(`/typeOfBatch/${id}`);
        //console.log("Type of batch deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error deleting type of batch:", error.response?.data || error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};