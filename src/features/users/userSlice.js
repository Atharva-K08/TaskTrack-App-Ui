import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "./userApi";

const loginThunk = createAsyncThunk("user/login", async (payload) => {
  try {
    const response = await loginApi(payload);
    localStorage.setItem("token", response.token);
    return response.data;
  } catch (err) {
    alert(err);
  }
});

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { loginThunk };
export default userSlice.reducer;
