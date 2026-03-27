import api from "../../services/api";

export const createBatchApi = async (payload) => {
  try {
    const response = await api.post("/batches", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
