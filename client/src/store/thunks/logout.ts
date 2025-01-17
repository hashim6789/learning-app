import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/utils/api";
import { config } from "../../shared/configs/config";
import { User } from "../../shared/types/User";

const host = config.API_BASE_URL;

// Created an async thunk for the logout API request
export const logout = createAsyncThunk(
  "auth/logout",
  async (user: User, thunkAPI) => {
    try {
      const response = await api.post(`${host}/${user}/auth/logout`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong during logout"
      );
    }
  }
);
