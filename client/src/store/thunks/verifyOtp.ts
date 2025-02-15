import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/utils/api"; // Import your Axios instance
import { User } from "../../shared/types/User";

// Define the async thunk function for OTP verification
export const verifyOtp = createAsyncThunk<
  void,
  { otp: string; role: User },
  { rejectValue: string }
>("auth/verifyOtp", async ({ otp }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/auth/otp/verify`, {
      otp,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP verification failed"
    );
  }
});
