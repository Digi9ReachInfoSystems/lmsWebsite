import api from "../config/axiosConfig";

export const createBlog = async (data) => {
    try {
        const response = await api.post('/blogs/create', data);
        console.log("Blog created succesfully", response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

export const getAllBlogs = async () => {
    try {
        const response = await api.get('/blogs/all');
        console.log("Blogs fetched successfully", response.data);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/blogs/single/${id}`);
        console.log("Blog fetched successfully", response.data);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteBlog = async (id) => {
    try {
        const response = await api.delete(`/blogs/delete/${id}`);
        console.log("Blog deleted successfully", response.data);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const updateBlog = async (id, data) => {
    try {
        const response = await api.put(`/blogs/update/${id}`, data);
        console.log("Blog updated successfully", response.data);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}