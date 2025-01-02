import api from "../config/axiosConfig";

export const applicationRecievedAdmin = async (name, email) => {
    try {
        const response = await api.post("/mail/applicationRecievedAdmin", { name, email });
        return response.data;
    } catch (error) {
        console.error("Error receiving application:", error.response?.data || error.message);
    }
}; 

export const applicationRecievedTeacher = async (name, email) => {
    try {
        const response = await api.post("/mail/applicationRecievedTeacher", { name, email });
        return response.data;
    } catch (error) {
        console.error("Error receiving teacher application:", error.response?.data || error.message);
    }
};
export const studentSignedUpAdmin = async (name, email) => {
    try {
        const response = await api.post("/mail/studentSignedUpAdmin", { name, email });
        return response.data;
    } catch (error) {
        console.error("Error notifying admin about student sign up:", error.response?.data || error.message);
    }
};
export const studentAccountCreated = async (name, email, password) => {
    try {
        const response = await api.post("/mail/studentCreated", { name, email, password });
        return response.data;
    } catch (error) {
        console.error("Error notifying student about account creation:", error.response?.data || error.message);
    }
};

export const teacherApplicationApproved = async (name, email, microsoft_email, password) => {
    try {
        const response = await api.post("/mail/TeacherCreated", { name, email, microsoft_email, password });
        return response.data;
    } catch (error) {
        console.error("Error notifying teacher about application approval:", error.response?.data || error.message);
    }
};

export const subscriptionDoneAdmin = async (name, email, Amount) => {
    try {
        const response = await api.post("/mail/studentPaymentReceived", { name, email, Amount });
        return response.data;
    } catch (error) {
        console.error("Error notifying admin about subscription:", error.response?.data || error.message);
    }
};
export const subscriptionDoneStudent = async (name, email, Amount) => {
    try {
        const response = await api.post("/mail/studentPaymentReceivedStudent", { name, email, Amount });
        return response.data;
    } catch (error) {
        console.error("Error notifying student about subscription:", error.response?.data || error.message);
    }
};

export const customerQueryAdmin = async (name, email) => {
    try {
        const response = await api.post("/mail/customerQueryRecievedAdmin", { name, email });
        return response.data;
    } catch (error) {
        console.error("Error notifying admin about customer query:", error.response?.data || error.message);
    }
};
export const customerQuery = async (name, email) => {
    try {
        const response = await api.post("/mail/customerQueryRecieved", { name, email });
        return response.data;
    } catch (error) {
        console.error("Error notifying customer about query:", error.response?.data || error.message);
    }
};
export const circularCreatedAdmin = async (role) => {
    try {
        const response = await api.post("/mail/circular", { role });
        return response.data;
    } catch (error) {
        console.error("Error creating circular:", error.response?.data || error.message);
    }
};
export const batchCreatedAdmin = async (teacher_ids, student_ids, subject_id, batch_name) => {
    try {
        const response = await api.post("/mail/newBatch", { teacher_ids, student_ids, subject_id, batch_name });
        return response.data;
    } catch (error) {
        console.error("Error creating batch:", error.response?.data || error.message);
    }
};
export const newQuizCreated = async (batch_id, subject_id) => {
    try {
        const response = await api.post("/mail/newQuiz", { batch_id, subject_id });
        return response.data;
    } catch (error) {
        console.error("Error creating new quiz:", error.response?.data || error.message);
    }
};
export const newAssignmentCreated = async (batch_id) => {
    try {
        const response = await api.post("/mail/newAssignment", { batch_id });
        return response.data;
    } catch (error) {
        console.error("Error creating new assignment:", error.response?.data || error.message);
    }
};
export const newMaterialCreated = async (batch_id) => {
    try {
        const response = await api.post("/mail/newMaterial", { batch_id });
        return response.data;
    } catch (error) {
        console.error("Error creating new material:", error.response?.data || error.message);
    }
};
export const quizResponseSubmited = async (quiz_id, student_id) => {
    try {
        const response = await api.post("/mail/quizResponseSubmitted", { quiz_id, student_id });
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz response:", error.response?.data || error.message);
    }
};
export const assignmentSubmited = async (assignment_id, student_id) => {
    try {
        const response = await api.post("/mail/assignmentSubmitted", { assignment_id, student_id });
        return response.data;
    } catch (error) {
        console.error("Error submitting assignment:", error.response?.data || error.message);
    }
};
export const newMeetingCreated = async (batch_id, subject_id) => {
    try {
        const response = await api.post("/mail/newMeeting", { batch_id, subject_id });
        return response.data;
    } catch (error) {
        console.error("Error creating new meeting:", error.response?.data || error.message);
    }
};
export const newlogin = async (userId) => {
    try {
        const response = await api.post("/mail/newLogin", { userId });
        return response.data;
    } catch (error) {
        console.error("Error notifying login:", error.response?.data || error.message);
    }
};
