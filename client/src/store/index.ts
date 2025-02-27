import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./slices/authSlice";
import themeReducers from "./slices/themeSlice";
import learningReducers from "./slices/learningSlice";

// import learnerReducers from "./slices/learnersSlice";
// import mentorReducers from "./slices/mentorsSlice";
// import categoryReducers from "./slices/categoriesSlice";
import courseReducers from "./slices/courseSlice";
import lessonReducers from "./slices/lessonsSlice";
import materialReducers from "./slices/materialSlice";

import groupReducers from "./slices/groupSlice";
import messageReducers from "./slices/messageSlice";
import videoCallReducers from "./slices/videoCallSlice";

// import socketReducers from "./slices/socketSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    theme: themeReducers,
    course: courseReducers,
    lesson: lessonReducers,
    material: materialReducers,
    learning: learningReducers,
    group: groupReducers,
    message: messageReducers,
    videoCall: videoCallReducers,
    // socket: socketReducers,

    // learners: learnerReducers,
    // mentors: mentorReducers,
    // categories: categoryReducers,
    // courseCreation: courseReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
