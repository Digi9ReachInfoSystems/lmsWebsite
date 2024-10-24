import api from "./axiosConfig";

export const getTeacherById = async (user_id) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get(`/teachers/${user_id}`);
        console.log("Teacher fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching teacher:", error.response?.data || error.message);
    }
}

export const getAllTeachers = async () => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get("/teachers/");
        console.log("Teachers fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error.response?.data || error.message);
    }
}


export const updateTeacherById = async (user_id, teacherData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.put(`/teachers/update/${user_id}`, teacherData);
        console.log("Teacher updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating teacher:", error.response?.data || error.message);
    }
}