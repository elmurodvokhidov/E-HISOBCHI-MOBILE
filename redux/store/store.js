import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import courseSlice from "../slices/courseSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
    }
});