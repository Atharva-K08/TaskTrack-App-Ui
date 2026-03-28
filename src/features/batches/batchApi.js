import api from "../../services/api";

export const createBatchApi = async (payload) => {
  try {
    const response = await api.post("/batches", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchBatchApi = async () => {
  try {
    const response = await api.get("/batches");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

