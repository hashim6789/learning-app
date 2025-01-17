import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthLoginCredentials } from "../../DTOS/AuthLoginCredentials";
import api from "../../shared/utils/api";

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
      const response = await api.post(
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
