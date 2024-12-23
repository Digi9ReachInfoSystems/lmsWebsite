import api from "../config/axiosConfig";

export const createFAQ = async (data) => {
    try {
        const response = await api.post("/faqs/create", data);
        ////console.log("FAQ created successfully:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getAllFAQ = async () => {
    try {
        const response = await api.get("/faqs/all");
        //console.log("FAQ fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const gitSingleFAQ = async (id) => {
    try {
        const response = await api.get(`/faqs/${id}`);
        //console.log("FAQ fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateFAQById = async (id, data) => {
    try {
        const response = await api.put(`/faqs/${id}`, data);
        //console.log("FAQ updated successfully:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteFAQ = async (id) => {
    try {
        const response = await api.delete(`/faqs/delete/${id}`);
        //console.log("FAQ deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};