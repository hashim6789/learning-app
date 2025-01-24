import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signup } from "../thunks/signup";
import { login } from "../thunks/login";
import { logout } from "../thunks/logout";
import { googleSignup } from "../thunks/googleSignup";
import { decodeToken } from "../../shared/utils/decodeToken";
import { User } from "../../shared/types/User";
import { verifyOtp } from "../thunks/verifyOtp";
import { forgotPassword } from "../thunks/forgotPassword";

// interface GoogleSignupError {
//   message: string;
// }

interface AuthState {
  isAuthenticated: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  user: User;
  loading: boolean;
  error: string | null;
}

const decode = decodeToken("accessToken");
const storedData = JSON.parse(localStorage.getItem("data") ?? "{}") as {
  isBlocked?: boolean;
  isVerified?: boolean;
};
const isBlocked = storedData.isBlocked ?? true;
const isVerified = storedData.isVerified ?? false;

const initialState: AuthState = {
  isAuthenticated: !!decode,
  isVerified,
  isBlocked,
  user: decode ? decode.role : "learner",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { message, user, data } = action.payload;

        state.loading = false;
        state.isAuthenticated = true;
        state.isVerified = data.isVerified;
        state.isBlocked = data.isBlocked;
        state.user = user;
        state.error = null;

        try {
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to store tokens in localStorage:", error);
        }

        console.log("Login successful:", message);
      })

      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        // state.user = "learner";
        state.isAuthenticated = false;
        state.isBlocked = true;
        state.isVerified = false;
        try {
          localStorage.removeItem("data");
          localStorage.removeItem("user");
        } catch (error) {
          console.error("Failed to deleted tokens in localStorage:", error);
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { message, data, user } = action.payload;

        state.loading = false;
        state.isAuthenticated = true;
        state.isBlocked = false;
        state.isVerified = false;
        state.user = user;
        state.error = null;

        console.log("Signup successful:", message);

        try {
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to store data in localStorage:", error);
        }
      })
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(verifyOtp.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        const { message, user, data } = action.payload;

        state.isAuthenticated = true;
        state.isVerified = true;
        state.isBlocked = false;
        state.error = null;
        state.loading = false;

        try {
          localStorage.removeItem("otpTimer");
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to store data in localStorage:", error);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isVerified = false;
        state.error = action.payload || "otp verification failed!";
      })
      .addCase(googleSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignup.fulfilled, (state, action) => {
        const { message, user, data } = action.payload;

        state.loading = false;
        state.isAuthenticated = true;
        state.isBlocked = false;
        state.isVerified = true;
        state.user = user;
        state.error = null;

        try {
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to store tokens in localStorage:", error);
        }

        console.log("Login successful:", message);
      })
      .addCase(googleSignup.rejected, (state, action: PayloadAction<any>) => {
        const { message } = action.payload;
        state.loading = false;
        state.error = message;
        state.isBlocked = true;
        state.isVerified = false;
        state.isAuthenticated = false;
        // (action.payload as GoogleSignupError).message ||
        // "Failed the Google login";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action: PayloadAction<any>) => {
        const { message } = action.payload;
        state.error =
          message || "an error when the forgot password generating!";
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
