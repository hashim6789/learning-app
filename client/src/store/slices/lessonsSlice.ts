import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "../../shared/types/Lesson";
interface LessonState {
  lesson: Lesson | null;
  prevLesson: Lesson | null;
  error: string | null;
  loading: boolean;
}

const initialState: LessonState = {
  lesson: null,
  prevLesson: null,
  error: null,
  loading: false,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLesson(state, action: PayloadAction<Lesson>) {
      state.lesson = action.payload;
      state.prevLesson = action.payload;
    },
    editLesson(state, action: PayloadAction<Partial<Lesson>>) {
      if (state.lesson) {
        state.lesson = { ...state.lesson, ...action.payload };
      }
    },
  },
  //   extraReducers:(builder) => {
  //     builder.addCase()
  //   }
});

export const { setLesson, editLesson } = lessonSlice.actions;
export default lessonSlice.reducer;

// extraReducers: (builder) => {
// builder
//   .addCase(updateCourse.pending, (state) => {
//     state.error = null;
//     state.loading = true;
//   })
//   .addCase(updateCourse.fulfilled, (state, action: PayloadAction<any>) => {
//     console.log(action.payload.data.course);
//     // const { data } = action.payload;
//     state.lesson = action.payload.data.lesson;
//     state.prevLesson = state.lesson;
//     state.error = null;
//     state.loading = false;
//   })
//   .addCase(updateCourse.rejected, (state, action: PayloadAction<any>) => {
//     const { message } = action.payload;
//     state.error = message;
//     state.loading = false;
//     state.lesson = state.prevLesson;
//   });

// },
