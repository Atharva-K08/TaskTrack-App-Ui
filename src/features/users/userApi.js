import api from "../../services/api";

export const loginApi = async (payload) => {
  try {
    const response = await api.post("/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
