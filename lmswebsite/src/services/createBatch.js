import api from "../config/axiosConfig";

// Get all classes
export const getClasses = async () => {
  try {
    const response = await api.get("/classes/");
    console.log("Classes fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching classes:",
      error.response?.data || error.message
    );
  }
};

// Get all subjects
export const getSubjects = async (classId) => {
  try {
    const response = await api.get(`/subjects/class/${classId}`);
    console.log("Subjects fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subjects:",
      error.response?.data || error.message
    );
  }
};

// Get teachers by subject and class ID
export const getTeachersBySubjectAndClass = async (subjectId, classId) => {
  try {
    const response = await api.get(`/teachers/subject/${subjectId}`);
    console.log("Teachers fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching teachers:",
      error.response?.data || error.message
    );
  }
};

// Get students by subject and class ID
export const getStudentsBySubjectAndClass = async (subjectId, classId) => {
  try {
    const response = await api.get(
      `/students/subject/${subjectId}/class/${classId}`
    );
    console.log("Students fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching students:",
      error.response?.data || error.message
    );
  }
};

// Create a new batch
export const createBatch = async (batchData) => {
  try {
    const response = await api.post("/batches/", batchData);
    console.log("Batch created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating batch:",
      error.response?.data || error.message
    );
  }
};

