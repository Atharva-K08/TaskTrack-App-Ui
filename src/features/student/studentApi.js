import api from "../../services/api";

// CREATE STUDENT
export const createStudentApi = async (payload) => {
  try {
    const response = await api.post("/students", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// GET MY PROFILE
export const getMyStudentProfileApi = async () => {
  try {
    const response = await api.get("/students/me");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// GET ALL STUDENTS
export const getStudentProfilesApi = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// UPDATE STUDENT
export const updateStudentApi = async (id, payload) => {
  try {
    const response = await api.put(`/students/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};