import api from "./axiosConfig";
export const createQuery = async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.post("/queries/createQuery", responseData);
        console.log("Query created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating query:", error.response?.data || error.message);
    }
};


export const getAllQuerys = async () => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get("/queries/");
        console.log("Queries fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching queries:", error.response?.data || error.message);
    }
}

export const updateQueryById = async (query_id, queryData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.put(`/queries/${query_id}`, queryData);
        console.log("Query updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating query:", error.response?.data || error.message);
    }
}