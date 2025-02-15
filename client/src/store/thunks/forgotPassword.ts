import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../shared/configs/config";

const host = config.API_BASE_URL;
type User = "admin" | "mentor" | "learner";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, role }: { email: string; role: User }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${host}/api/auth/forgot-password`,
        {
          email,
          role,
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
