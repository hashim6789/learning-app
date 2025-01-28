// src/store/courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../shared/types/Course";
import { updateCourse } from "../thunks/course/updateCourse";
interface CourseState {
  course: Course | null;
  prevCourse: Course | null;
  error: string | null;
  loading: boolean;
}

const initialState: CourseState = {
  course: null,
  prevCourse: null,
  error: null,
  loading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse(state, action: PayloadAction<Course>) {
      state.course = action.payload;
      state.prevCourse = action.payload;
    },
    editCourse(state, action: PayloadAction<Partial<Course>>) {
      if (state.course) {
        state.course = { ...state.course, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCourse.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload.data.course);
        // const { data } = action.payload;

        state.course = action.payload.data.course;
        state.prevCourse = state.course;
        state.error = null;
        state.loading = false;
      })
      .addCase(updateCourse.rejected, (state, action: PayloadAction<any>) => {
        const { message } = action.payload;
        state.error = message;
        state.loading = false;
        state.course = state.prevCourse;
      });
  },
});

export const { setCourse, editCourse } = courseSlice.actions;
export default courseSlice.reducer;
