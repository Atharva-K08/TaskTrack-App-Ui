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

// UPDATE
export const updateBatchApi = async (id, payload) => {
  try {
    const response = await api.put(`/batches/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// DELETE
export const deleteBatchApi = async (id) => {
  try {
    const response = await api.delete(`/batches/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};