import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTeacherApi,
  getTeachersApi,
  getMyTeacherApi,
  updateTeacherApi,
  deleteTeacherApi,
} from "./teacherApi";

/* ------------------- THUNKS ------------------- */

export const createTeacherThunk = createAsyncThunk(
  "teacher/create",
  async (payload) => {
    const res = await createTeacherApi(payload);
    return res.data;
  }
);

export const getTeachersThunk = createAsyncThunk(
  "teacher/getAll",
  async () => {
    const res = await getTeachersApi();
    return res.data;
  }
);

export const getMyTeacherThunk = createAsyncThunk(
  "teacher/getMy",
  async () => {
    const res = await getMyTeacherApi();
    return res.data;
  }
);

export const updateTeacherThunk = createAsyncThunk(
  "teacher/update",
  async ({ id, data }) => {
    const res = await updateTeacherApi(id, data);
    return res.data;
  }
);

export const deleteTeacherThunk = createAsyncThunk(
  "teacher/delete",
  async (id) => {
    await deleteTeacherApi(id);
    return id;
  }
);

/* ------------------- STATE ------------------- */

const initialState = {
  teachers: [],
  myProfile: null,
  loading: false,
  error: null,
};

/* ------------------- SLICE ------------------- */

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeachersThunk.fulfilled, (state, action) => {
        state.teachers = action.payload;
      })
      .addCase(createTeacherThunk.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(updateTeacherThunk.fulfilled, (state, action) => {
        state.teachers = state.teachers.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })
      .addCase(deleteTeacherThunk.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(
          (t) => t._id !== action.payload
        );
      })
      .addCase(getMyTeacherThunk.fulfilled, (state, action) => {
        state.myProfile = action.payload;
      });
  },
});

export default teacherSlice.reducer;