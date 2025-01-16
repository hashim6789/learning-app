import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signup } from "../thunks/signup";
import { login } from "../thunks/login";
import { User } from "lucide-react";
import { googleSignup } from "../thunks/googleSignup";

type User = "admin" | "learner" | "mentor";

interface GoogleSignupError {
  message: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { message, user, accessToken, refreshToken } = action.payload;

        state.loading = false;
        state.isAuthenticated = true;
        state.user = user;
        state.error = null;

        try {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        } catch (error) {
          console.error("Failed to store tokens in localStorage:", error);
        }

        console.log("Login successful:", message);
      })

      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            user: User;
            accessToken: string;
            refreshToken: string;
          }>
        ) => {
          const { message, user, accessToken, refreshToken } = action.payload;

          state.error = null;
          state.loading = false;
          state.isAuthenticated = true;
          state.user = user;
          try {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
          } catch (error) {
            console.error("Failed to store tokens in localStorage:", error);
          }
          console.log("Signup successful:", message);
        }
      )
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(googleSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        googleSignup.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            user: User;
            accessToken: string;
            refreshToken: string;
          }>
        ) => {
          const { message, user, accessToken, refreshToken } = action.payload;

          state.isAuthenticated = true;
          state.loading = false;
          state.user = user;
          try {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
          } catch (error) {
            console.error("Failed to store tokens in localStorage:", error);
          }
          console.log("login with google successful:", message);
        }
      )
      .addCase(googleSignup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as GoogleSignupError).message ||
          "Failed the Google login";
      });
  },
});

// Export the actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
