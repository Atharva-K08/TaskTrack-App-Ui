import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBatchApi, deleteBatchApi, fetchBatchApi, updateBatchApi } from "./batchApi";

const createBatchThunk = createAsyncThunk(
  "batch/createBatch",
  async (payload) => {
    try {
      const response = await createBatchApi(payload);
      return response;
    } catch (err) {
      alert(err);
    }
  },
);
const fetchBatchThunk = createAsyncThunk("batch/fetchBatches", async () => {
  try {
    const response = await fetchBatchApi();
    return response;
  } catch (err) {
    alert(err);
  }
});

const updateBatchThunk = createAsyncThunk(
  "batch/update",
  async ({ id, data }) => {
    const response = await updateBatchApi(id, data);
    return response.data;
  },
);

const deleteBatchThunk = createAsyncThunk("batch/delete", async (id) => {
  await deleteBatchApi(id);
  return id;
});

const initialState = {
  batch: null,
  batches: [],
  loading: false,
  error: null,
};

const batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBatchThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBatchThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.batch = action.payload;
        state.token = action.payload.token;
      })
      .addCase(createBatchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBatchThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatchThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload.data;
        console.log(state.batches);
      })
      .addCase(fetchBatchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBatchThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.batches = state.batches.map((batch) =>
          batch._id === action.payload._id ? action.payload : batch,
        );
      })

      .addCase(deleteBatchThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.batches = state.batches.filter(
          (batch) => batch._id !== action.payload,
        );
      });
  },
});

export {
  createBatchThunk,
  fetchBatchThunk,
  updateBatchThunk,
  deleteBatchThunk,
};
export default batchSlice.reducer;
