import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/utils/api";
import { Lesson } from "../../../shared/types/Lesson";
import { config } from "../../../shared/configs/config";
import { User } from "../../../shared/types/User";

const host = config.API_BASE_URL;

type newLesson = Partial<Lesson> & { categoryId: string };

// Create an async thunk for the login API request
export const updateLesson = createAsyncThunk(
  "lesson/create",
  async ({ data, user }: { data: newLesson; user: User }, thunkAPI) => {
    try {
      const response = await api.put(
        `${host}/${user}/lessons/${data.id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
