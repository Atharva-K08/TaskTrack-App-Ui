import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBatchApi, fetchBatchApi } from "./batchApi";

const createBatchThunk = createAsyncThunk("batch/login", async (payload) => {
  try {
    const response = await createBatchApi(payload);
    return response.data;
  } catch (err) {
    alert(err);
  }
});
const fetchBatchThunk = createAsyncThunk("batch/fetchBatches", async () => {
  try {
    const response = await fetchBatchApi();
    return response.data;
  } catch (err) {
    alert(err);
  }
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
        state.batch = action.payload.batch;
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
        state.batches = action.payload;
      })
      .addCase(fetchBatchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { createBatchThunk, fetchBatchThunk };
export default batchSlice.reducer;
