import api from "../config/axiosConfig";
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

// Function to fetch query by ID using configured Axios instance
export const fetchQueryById = async (queryId) => {
    try {
        const response = await api.get(`/queries/query/${queryId}`);
        return response.data; // Return query data
    } catch (error) {
        if (error.response) {
            // Handle known server errors
            console.error('Error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (error.request) {
            // Handle no response from server
            console.error('No response from server:', error.request);
            throw new Error('No response from the server.');
        } else {
            // Handle other errors
            console.error('Request setup error:', error.message);
            throw new Error('Something went wrong.');
        }
    }
};