import api from "../config/axiosConfig";



export const getBoards = async () => {
    try {
        const response = await api.get("/boards/");
        return response.data;
    } catch (error) {
        console.error("Error fetching boards:", error);
        throw error;
    }
};

export const createBoard = async (boardData) => {
    try {
        const response = await api.post("/boards/", boardData);
        console.log("Board created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating board:", error);
        throw error;
    }
};

export const deleteBoard = async (boardId) => {
    try {
        const response = await api.delete(`/boards/${boardId}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting board:", error);
        throw error;
    }
};

export const updateBoard = async (boardId, updatedData) => {
    try {
        const response = await api.put(`/boards/${boardId}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating board:", error);
        throw error;
    }
}