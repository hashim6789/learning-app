// redux/learningSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Material {
  id: string;
  title: string;
  description: string;
  type: "reading" | "video";
  duration: number;
  fileKey: string;
  isCompleted: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: number;
  materials: Material[];
  mentorId: string;
  courseId: string;
}

interface LearningState {
  lessons: Lesson[];
  currentMaterial: Material | null;
  loading: boolean;
  error: string | null;
}

const initialState: LearningState = {
  lessons: [],
  currentMaterial: null,
  loading: false,
  error: null,
};

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    setLessons(state, action: PayloadAction<Lesson[]>) {
      state.lessons = action.payload;
    },
    setCurrentMaterial(state, action: PayloadAction<Material | null>) {
      state.currentMaterial = action.payload;
    },
    updateMaterialProgress(
      state,
      action: PayloadAction<{ id: string; isCompleted: boolean }>
    ) {
      if (
        state.currentMaterial &&
        state.currentMaterial.id === action.payload.id
      ) {
        state.currentMaterial.isCompleted = action.payload.isCompleted;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setLessons,
  setCurrentMaterial,
  updateMaterialProgress,
  setLoading,
  setError,
} = learningSlice.actions;

export default learningSlice.reducer;
