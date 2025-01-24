import { FormEvent, useState } from "react";

// Imported custom hooks
import useAuth from "../../../hooks/useAuth";
import useFormErrors from "../../../hooks/useFormErrors";

// Imported DTOs for validating the credentials
import { AuthLoginCredentials } from "../../../DTOS/AuthLoginCredentials";
import { AuthSignupCredentials } from "../../../DTOS/AuthSignupCredentials";
import { ForgotCredentials } from "../../../DTOS/ForgotCredentials";

const useLearnerAuth = () => {
  const { loading, error, handleLogin, handleSignup, handleForgotPassword } =
    useAuth();
  const { errors, validateCredentials } = useFormErrors<AuthLoginCredentials>();
  const {
    errors: forgotErrors,
    validateCredentials: validateForgotCredentials,
  } = useFormErrors<ForgotCredentials>();

  // Form state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
  const [forgotPasswordModal, setForgotPasswordModal] =
    useState<boolean>(false);
  // const [forgotPasswordSuccess, setForgotPasswordSuccess] =
  //   useState<string>("");

  // Handle form submission for login and signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login process
      const loginCredentials = new AuthLoginCredentials();
      loginCredentials.email = email;
      loginCredentials.password = password;

      const isValid = await validateCredentials(loginCredentials);
      if (!isValid) return;

      handleLogin(loginCredentials, "learner");
    } else {
      const signupCredentials = new AuthSignupCredentials();
      signupCredentials.email = email;
      signupCredentials.password = password;
      signupCredentials.confirmPassword = confirmPassword;
      signupCredentials.firstName = firstName;
      signupCredentials.lastName = lastName;

      const isValid = await validateCredentials(signupCredentials);
      if (!isValid) return;

      handleSignup(signupCredentials, "learner");
    }
  };

  // Handle forgot password request
  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const forgotCredentials = new ForgotCredentials();
    forgotCredentials.email = forgotPasswordEmail;

    const isValid = await validateForgotCredentials(forgotCredentials);
    if (!isValid) {
      return;
    }
    handleForgotPassword(forgotPasswordEmail, "learner");
  };

  return {
    loading,
    error,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    showPassword,
    setShowPassword,
    isLogin,
    setIsLogin,
    errors,
    handleSubmit,
    forgotPasswordEmail,
    setForgotPasswordEmail,
    forgotPasswordModal,
    setForgotPasswordModal,
    // forgotPasswordSuccess,
    handleForgotPasswordSubmit,
    forgotErrors,
  };
};

export default useLearnerAuth;
