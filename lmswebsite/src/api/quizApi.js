import api from "./axiosConfig";

export const createQuiz = async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.post("/quizzes/create", responseData);
        console.log("Quiz created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error.response?.data || error.message);
    }
};


export const getQuizForSpecificBatcAndClass = async (batch_index, class_level) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get(`/quizzes/batch/${batch_index}/class/${class_level}`);
        console.log("Quiz fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz:", error.response?.data || error.message);
    }
    
}


export const getQuizById = async (quiz_id) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get(`/quizzes/${quiz_id}`);
        console.log("Quiz fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz:", error.response?.data || error.message);
    }
    
}