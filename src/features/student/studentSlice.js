import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createStudentApi,
  getMyStudentProfileApi,
  getStudentProfilesApi,
  updateStudentApi,
} from "./studentApi";

/* ------------------- THUNKS ------------------- */

// CREATE
export const createStudentThunk = createAsyncThunk(
  "student/create",
  async (payload) => {
    const res = await createStudentApi(payload);
    return res.data;
  }
);

// GET MY PROFILE
export const getMyStudentThunk = createAsyncThunk(
  "student/getMyProfile",
  async () => {
    const res = await getMyStudentProfileApi();
    return res.data;
  }
);

// GET ALL
export const getStudentsThunk = createAsyncThunk(
  "student/getAll",
  async () => {
    const res = await getStudentProfilesApi();
    return res.data;
  }
);

// UPDATE
export const updateStudentThunk = createAsyncThunk(
  "student/update",
  async ({ id, data }) => {
    const res = await updateStudentApi(id, data);
    return res.data;
  }
);

/* ------------------- INITIAL STATE ------------------- */

const initialState = {
  students: [],
  myProfile: null,
  loading: false,
  error: null,
};

/* ------------------- SLICE ------------------- */

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createStudentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })

      // GET ALL
      .addCase(getStudentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })

      // GET MY PROFILE
      .addCase(getMyStudentThunk.fulfilled, (state, action) => {
        state.myProfile = action.payload;
      })

      // UPDATE
      .addCase(updateStudentThunk.fulfilled, (state, action) => {
        state.students = state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        );
      });
  },
});

export default studentSlice.reducer;