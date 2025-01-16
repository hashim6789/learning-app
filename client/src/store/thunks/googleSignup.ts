import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const host = "http://localhost:3000";
type User = "admin" | "mentor" | "learner";

export const googleSignup = createAsyncThunk(
  "auth/googleSignup",
  async (
    { token, user }: { token: string; user: User },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${host}/${user}/auth/google`, {
        token,
      });
      console.log(response);
      return response.data; // Return the data (user info and token)
    } catch (error: any) {
      return rejectWithValue({
        message: (error.response.data as string) || "Failed the Google login",
      }); // Handle error
    }
  }
);
