//imported build-in hooks
import { useState } from "react";

//imported custom hooks
import useAuth from "../../../hooks/useAuth";
import useFormErrors from "../../../hooks/useFormErrors";

//imported DTO's for validating authentication credentials
import { AuthLoginCredentials } from "../../../DTOS/AuthLoginCredentials";

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
