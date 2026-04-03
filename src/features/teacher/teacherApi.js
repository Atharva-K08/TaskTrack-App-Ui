import api from "../../services/api";

/* ------------------- CREATE ------------------- */
export const createTeacherApi = async (payload) => {
  try {
    const res = await api.post("/teachers", payload);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

/* ------------------- GET ALL ------------------- */
export const getTeachersApi = async () => {
  try {
    const res = await api.get("/teachers");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

/* ------------------- GET MY PROFILE ------------------- */
export const getMyTeacherApi = async () => {
  try {
    const res = await api.get("/teachers/me");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

/* ------------------- UPDATE ------------------- */
export const updateTeacherApi = async (id, payload) => {
  try {
    const res = await api.put(`/teachers/${id}`, payload);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

/* ------------------- DELETE ------------------- */
export const deleteTeacherApi = async (id) => {
  try {
    const res = await api.delete(`/teachers/${id}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};