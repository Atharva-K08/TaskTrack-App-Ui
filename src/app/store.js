import userReducer from "../features/users/userSlice";
import studentReducer from "../features/student/studentSlice";
import batchReducer from "../features/batches/batchSlice";
import teacherReducer from "../features/teacher/teacherSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    batch: batchReducer,
    student: studentReducer,
    teacher: teacherReducer,
  },
});

export default store;
