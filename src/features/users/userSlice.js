import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUsersApi,
  getAllUsersApi,
  getUsersApi,
  loginApi,
} from "./userApi";

const loginThunk = createAsyncThunk("user/login", async (payload) => {
  try {
    const response = await loginApi(payload);
    localStorage.setItem("token", response.token);
    return response.data;
  } catch (err) {
    alert(err);
  }
});
const fetchUsersThunk = createAsyncThunk("user/fetchUsers", async (role) => {
  try {
    const response = await getUsersApi(role);
    return response.data;
  } catch (err) {
    alert(err);
  }
});
const fetchUsersListThunk = createAsyncThunk(
  "user/fetchUsersList",
  async () => {
    try {
      const response = await getAllUsersApi();
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
);
const createUsersThunk = createAsyncThunk(
  "user/createUsers",
  async (userData) => {
    try {
      const response = await createUsersApi(userData);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
);

const initialState = {
  users: [],
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
      })
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("hello");
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsersListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { loginThunk, fetchUsersThunk, createUsersThunk, fetchUsersListThunk };
export default userSlice.reducer;
