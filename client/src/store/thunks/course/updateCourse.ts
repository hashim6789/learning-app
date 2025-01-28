import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/utils/api";
import { Course } from "../../../shared/types/Course";
import { config } from "../../../shared/configs/config";
import { User } from "../../../shared/types/User";

const host = config.API_BASE_URL;

type newCourse = Partial<Course> & { categoryId: string };

// Create an async thunk for the login API request
export const updateCourse = createAsyncThunk(
  "course/update",
  async ({ data, user }: { data: newCourse; user: User }, thunkAPI) => {
    try {
      const response = await api.put(
        `${host}/${user}/courses/${data.id}`,
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
