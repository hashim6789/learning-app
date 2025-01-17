import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/thunks/logout";
import { AppDispatch, RootState } from "../store";
import { AuthLoginCredentials } from "../DTOS/AuthLoginCredentials";
import { AuthSignupCredentials } from "../DTOS/AuthSignupCredentials";
import { signup } from "../store/thunks/signup";
import { login } from "../store/thunks/login";
import { googleSignup } from "../store/thunks/googleSignup";
import { useNavigate } from "react-router-dom";

type User = "admin" | "learner" | "mentor";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  //for login
  const handleLogin = async (credentials: AuthLoginCredentials, user: User) => {
    try {
      await dispatch(login({ credentials, user })).unwrap();
      navigate(`/${user}/dashboard`);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  //for signup
  const handleSignup = async (
    credentials: AuthSignupCredentials,
    user: User
  ) => {
    try {
      await dispatch(signup({ credentials, user })).unwrap();
      navigate(`/${user}/dashboard`);
    } catch (err: any) {
      console.error("Signup failed:", err);
    }
  };

  // //for google signup
  const handleGoogleSignup = (token: string, user: User) => {
    console.log("object", user);
    dispatch(googleSignup({ token, user })); // Dispatch the google signup action
    navigate(`/${user}/dashboard`);
  };

  //for logout
  const handleLogout = (user: User) => {
    dispatch(logout(user));
    navigate("/learner/login");
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    handleLogin,
    handleSignup,
    handleGoogleSignup,
    handleLogout,
  };
};

export default useAuth;
