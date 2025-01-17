import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signup } from "../thunks/signup";
import { login } from "../thunks/login";
import { logout } from "../thunks/logout";
import { googleSignup } from "../thunks/googleSignup";
import { decodeToken } from "../../shared/utils/decodeToken";
import { User } from "../../shared/types/User";
import Cookies from "js-cookie";

interface GoogleSignupError {
  message: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  error: string | null;
}

const decode = decodeToken("accessToken");

const initialState: AuthState = {
  isAuthenticated: !!decode,
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
        Cookies.remove("accessToken");
      })
      .addCase(logout.fulfilled, (state) => {
        (state.loading = false),
          (state.user = "learner"),
          (state.isAuthenticated = false);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
          // try {
          //   localStorage.setItem("accessToken", accessToken);
          //   localStorage.setItem("refreshToken", refreshToken);
          // } catch (error) {
          //   console.error("Failed to store tokens in localStorage:", error);
          // }
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
          // try {
          //   localStorage.setItem("accessToken", accessToken);
          //   localStorage.setItem("refreshToken", refreshToken);
          // } catch (error) {
          //   console.error("Failed to store tokens in localStorage:", error);
          // }
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
// export const { logout } = authSlice.actions;
export default authSlice.reducer;
