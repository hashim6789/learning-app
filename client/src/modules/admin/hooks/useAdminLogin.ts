import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AuthLoginCredentials } from "../../../DTOS/AuthLoginCredentials";
import useFormErrors from "../../../hooks/useFormErrors";

const useAdminLogin = () => {
  const { loading, error, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { errors, validateCredentials } = useFormErrors<AuthLoginCredentials>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = new AuthLoginCredentials();
    credentials.email = email;
    credentials.password = password;

    const isValid = await validateCredentials(credentials);

    if (isValid) {
      handleLogin(credentials, "admin");
    }
  };

  return {
    loading,
    error,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    errors,
    handleSubmit,
  };
};

export default useAdminLogin;
