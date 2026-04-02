import api from "../../services/api";

export const loginApi = async (payload) => {
  try {
    const response = await api.post("/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getUsersApi = async (role) => {
  try {
    const response = await api.get("/users?role="+role);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const createUsersApi = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
