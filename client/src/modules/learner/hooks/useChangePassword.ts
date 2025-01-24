import { FormEvent, useState, useEffect } from "react";
import { ChangePasswordCredentials } from "../../../DTOS/ChangePasswordCredentials";
import useFormErrors from "../../../hooks/useFormErrors";
import { showToast } from "../../../shared/utils/toastUtils";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";
import { useNavigate, useParams } from "react-router-dom";

const useChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { errors, validateCredentials } =
    useFormErrors<ChangePasswordCredentials>();

  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get(
          `${config.API_BASE_URL}/learner/auth/${token}/change-password`
        );
        setValid(true);
      } catch (err) {
        setValid(false);
        setErrorMessage(
          "Invalid or expired password reset link. Please try again."
        );
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const changePasswordCredentials = new ChangePasswordCredentials();
    changePasswordCredentials.password = newPassword;
    changePasswordCredentials.confirmPassword = confirmPassword;

    const isValid = await validateCredentials(changePasswordCredentials);
    if (!isValid) return;
    try {
      setLoading(true);
      const response = await api.patch(
        `${config.API_BASE_URL}/learner/auth/change-password`,
        { password: newPassword }
      );

      showToast.success(
        "The password changed successfully",
        response.data?.message
      );
      navigate("/learner/login");
    } catch (error) {
      showToast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
    errors,
    loading,
    isValid,
    errorMessage,
  };
};

export default useChangePassword;
