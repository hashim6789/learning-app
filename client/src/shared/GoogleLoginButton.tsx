import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../hooks/useAuth";

interface GoogleLoginButtonProps {
  user: "admin" | "mentor" | "learner";
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ user }) => {
  const { handleGoogleSignup, loading, error } = useAuth();

  const handleSuccess = async (response: any) => {
    try {
      const { credential } = response;
      console.log("Google Credential:", credential);

      // Trigger the Google signup process using the Redux action
      handleGoogleSignup(credential, user);
    } catch (error) {
      console.log("Google login failed:", error);
    }
  };

  const handleFailure = () => {
    console.log("Login Failed:", error);
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        useOneTap
      />
      {loading && <p>Loading...</p>} {/* Optionally display loading */}
    </div>
  );
};

export default GoogleLoginButton;
