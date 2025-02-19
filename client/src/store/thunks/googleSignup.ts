import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../shared/configs/config";
import { User } from "../../shared/types/User";

const host = config.API_BASE_URL;

export const googleSignup = createAsyncThunk(
  "auth/googleSignup",
  async (
    { token, role }: { token: string; role: User },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${host}/api/auth/google`,
        {
          token,
          role,
        },
        { withCredentials: true }
      );
      console.log(response);
      return response.data; // Return the data (user info and token)
    } catch (error: any) {
      return rejectWithValue({
        message: (error.response.data as string) || "Failed the Google login",
      }); // Handle error
    }
  }
);
