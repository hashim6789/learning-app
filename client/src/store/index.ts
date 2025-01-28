import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./slices/authSlice";

// import learnerReducers from "./slices/learnersSlice";
// import mentorReducers from "./slices/mentorsSlice";
// import categoryReducers from "./slices/categoriesSlice";
import courseReducers from "./slices/courseSlice";
import lessonReducers from "./slices/lessonsSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    course: courseReducers,
    lesson: lessonReducers,

    // learners: learnerReducers,
    // mentors: mentorReducers,
    // categories: categoryReducers,
    // courseCreation: courseReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
