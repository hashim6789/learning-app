import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type User = "admin" | "mentor" | "learner";

const host = "http://localhost:3000";

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { credentials, user }: { credentials: SignupCredentials; user: User },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${host}/${user}/auth/signup`,
        credentials
      );
      return response.data; // Return response data on success
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);
