import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../shared/configs/config";

const host = config.API_BASE_URL;
type User = "admin" | "mentor" | "learner";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, user }: { email: string; user: User }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${host}/${user}/auth/forgot-password`,
        {
          email,
        },
        { withCredentials: true }
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
