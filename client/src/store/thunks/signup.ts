import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/utils/api";
import { AuthSignupCredentials } from "../../DTOS/AuthSignupCredentials";
import { config } from "../../shared/configs/config";

const host = config.API_BASE_URL;

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ credentials }: { credentials: AuthSignupCredentials }, thunkAPI) => {
    try {
      const response = await api.post(`${host}/api/auth/signup`, credentials);
      return response.data; // Return response data on success
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);
