import userReducer from "../features/users/userSlice";
import batchReducer from "../features/batches/batchSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    batch: batchReducer,
  },
});

export default store;