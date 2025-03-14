import { useState, useEffect, useRef } from "react";
import api from "../shared/utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { verifyOtp } from "../store/thunks/verifyOtp";
import { User } from "../shared/types/User";
import { showToast } from "../shared/utils/toastUtils";

const useOtp = (onComplete?: (otp: string) => void) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(true);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Call onComplete when all fields are filled
    if (newOtp.every((digit) => digit !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key to move to the previous input
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event and only allow numeric OTP input
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      const newOtp = [...otp];

      digits.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });

      setOtp(newOtp);

      if (digits.length === 6 && onComplete) {
        onComplete(digits.join(""));
      }
    }
  };

  // Resend OTP logic
  const resendOtp = async () => {
    localStorage.setItem("otpTimer", "20");
    setTimer(20);
    setIsActive(true);
    setOtp(new Array(6).fill(""));
    inputRefs.current[0].focus();

    try {
      const response = await api.post(`/api/auth/resend`);
      showToast.success("otp resend successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  // Timer logic
  useEffect(() => {
    const storedTimer = localStorage.getItem("otpTimer");
    if (storedTimer) {
      setTimer(parseInt(storedTimer, 10));
      setIsActive(true);
    }

    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem("otpTimer", newTimer.toString());
          return newTimer;
        });
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      // localStorage.removeItem("otpTimer");
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  const handleVerify = async (role: User): Promise<void> => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      console.log(otpString);
      try {
        const resultAction = await dispatch(
          verifyOtp({ otp: otpString, role })
        );
        if (verifyOtp.fulfilled.match(resultAction)) {
          showToast.success("The OTP verified successfully!");

          if (user === "learner") {
            navigate("/");
          } else {
            navigate(`/${user}/dashboard`);
          }
        } else {
          showToast.error("The OTP verification failed!");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return {
    otp,
    timer,
    isActive,
    inputRefs,
    handleVerify,
    handleChange,
    handleKeyDown,
    handlePaste,
    resendOtp,
  };
};

export default useOtp;
