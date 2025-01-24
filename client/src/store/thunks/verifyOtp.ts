import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/utils/api"; // Import your Axios instance
import { config } from "../../shared/configs/config"; // Import your config file
import { User } from "../../shared/types/User";

// Define the async thunk function for OTP verification
export const verifyOtp = createAsyncThunk<
  void,
  { otp: string; user: User },
  { rejectValue: string }
>("auth/verifyOtp", async ({ otp, user }, { rejectWithValue }) => {
  try {
    const response = await api.post(
      `${config.API_BASE_URL}/${user}/auth/otp/verify`,
      {
        otp,
      }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP verification failed"
    );
  }
});
