import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthLoginCredentials } from "../../DTOS/AuthLoginCredentials";

type User = "admin" | "learner" | "mentor";

const host = "http://localhost:3000";

// Create an async thunk for the login API request
export const login = createAsyncThunk(
  "auth/login",
  async (
    { credentials, user }: { credentials: AuthLoginCredentials; user: User },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${host}/${user}/auth/login`,
        credentials
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
