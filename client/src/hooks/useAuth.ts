import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/thunks/logout";
import { AppDispatch, RootState } from "../store";
import { AuthLoginCredentials } from "../DTOS/AuthLoginCredentials";
import { AuthSignupCredentials } from "../DTOS/AuthSignupCredentials";
import { signup } from "../store/thunks/signup";
import { login } from "../store/thunks/login";
import { googleSignup } from "../store/thunks/googleSignup";
import { forgotPassword } from "../store/thunks/forgotPassword";
import { useNavigate } from "react-router-dom";
import { showToast } from "../shared/utils/toastUtils";
import { ForgotCredentials } from "../DTOS/ForgotCredentials";

type User = "admin" | "learner" | "mentor";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // for login
  const handleLogin = async (credentials: AuthLoginCredentials) => {
    const { role } = credentials;
    try {
      await dispatch(login({ credentials })).unwrap();
      if (role === "learner") {
        navigate("/");
      } else {
        navigate(`/${role}/dashboard`);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // for signup
  const handleSignup = async (credentials: AuthSignupCredentials) => {
    try {
      await dispatch(signup({ credentials })).unwrap();
      navigate(`/${credentials.role}/otp`);
    } catch (err: any) {
      console.error("Signup failed:", err);
    }
  };

  // for google signup
  const handleGoogleSignup = async (token: string, role: User) => {
    try {
      await dispatch(googleSignup({ token, role }));
      if (user === "learner") {
        navigate("/");
      } else {
        navigate(`/${user}/dashboard`);
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
    }
  };

  // for forgot password
  const handleForgotPassword = async (data: ForgotCredentials) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      showToast.success("Password reset link sent successfully.");
      console.log("Password reset link sent successfully.");
    } catch (err) {
      showToast.error("Forgot password failed:");
      console.error("Forgot password failed:", err);
    }
  };

  // for logout
  const handleLogout = (role: User) => {
    dispatch(logout(role));
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    handleLogin,
    handleSignup,
    handleGoogleSignup,
    handleForgotPassword,
    handleLogout,
  };
};

export default useAuth;
