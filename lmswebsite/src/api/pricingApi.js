import api from "../config/axiosConfig";

export const createprice = async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.post("/pricing/", responseData);
        //console.log("priceData created successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error creating quiz:", error.response?.data || error.message);
    }
};

export const getgst= async () => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get("/pricing/gst");
        //console.log("priceData created successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error creating quiz:", error.response?.data || error.message);
    }
};

export const getdiscount= async () => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get("/pricing/discount");
        //console.log("priceData created successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error creating quiz:", error.response?.data || error.message);
    }
};

export const updategst= async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.put("/pricing/gst", responseData);
        //console.log("priceData created successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error creating quiz:", error.response?.data || error.message);
    }
};

export const updatediscount= async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.put("/pricing/discount", responseData);
        //console.log("priceData created successfully:", response.data);
        return response.data;
    } catch (error) {
        //console.error("Error creating quiz:", error.response?.data || error.message);
    }
};