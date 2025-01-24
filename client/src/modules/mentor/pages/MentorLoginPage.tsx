import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { validateCredentials } from "../../../DTOS/authValidator";
import { AuthLoginCredentials } from "../../../DTOS/AuthLoginCredentials";
import { AuthSignupCredentials } from "../../../DTOS/AuthSignupCredentials";
import GoogleLoginButton from "../../../shared/GoogleLoginButton";

interface AuthFormProps {
  onSubmit?: (data: { name?: string; email: string; password: string }) => void;
}

const MentorLoginPage: React.FC<AuthFormProps> = () => {
  const { loading, error, handleSignup, handleLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  // const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false); // Show/hide password

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password for signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState<string[]>([]); // Error state to hold validation errors

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login flow
      const credentials = new AuthLoginCredentials();
      credentials.email = email;
      credentials.password = password;

      // Validate the login credentials
      const validationErrors = await validateCredentials<AuthLoginCredentials>(
        credentials
      );

      console.log(validationErrors);
      if (validationErrors.length > 0) {
        setErrors(validationErrors); // Set errors based on validation
      } else {
        setErrors([]); // Clear errors if validation is successful
        handleLogin(credentials, "mentor"); // Dispatch login action
      }
    } else {
      // Signup flow
      const signupCredentials = new AuthSignupCredentials();
      signupCredentials.lastName = lastName;
      signupCredentials.firstName = firstName;
      signupCredentials.email = email;
      signupCredentials.password = password;
      signupCredentials.confirmPassword = confirmPassword;

      // Validate the signup credentials
      const validationErrors = await validateCredentials<AuthSignupCredentials>(
        signupCredentials
      );

      console.log(validationErrors);
      if (validationErrors.length > 0) {
        setErrors(validationErrors); // Set errors based on validation
      } else {
        setErrors([]); // Clear errors if validation is successful
        await handleSignup(signupCredentials, "mentor"); // Dispatch signup action
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600">
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-lg">Your journey starts here.</p>
        </div>
        <img
          src="/api/placeholder/800/600"
          alt="Mentor"
          className="object-cover w-full h-full opacity-75"
        />
      </div>

      {/* Right side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2">Welcome to EazyDev</h1>
            <p className="text-gray-600">
              Access the platform as a mentor or create an account to get
              started.
            </p>
          </div>

          {/* Auth Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors
                ${isLogin ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors
                ${!isLogin ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Register
            </button>
          </div>

          {/* Show Errors if Any */}
          {errors &&
            errors.length > 0 &&
            errors.map((error, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-red-700 mb-2">
                  {error}
                </label>
              </div>
            ))}

          {/* Show Error or Loading State */}
          {loading && (
            <div className="text-center py-4">
              <p className="text-blue-600">Processing...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mentor Name (Signup Only) */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mentor First Name
                  </label>
                  <input
                    type="text"
                    name="mentorName"
                    placeholder="Enter your Mentor First Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mentor Last Name (optional)
                  </label>
                  <input
                    type="text"
                    name="mentorName"
                    placeholder="Enter your Mentor Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              disabled={loading} // Disable button while loading
            >
              {isLogin ? "Login" : "Sign up"}
            </button>

            {/* Google Sign In */}
            <div className="mt-6">
              <GoogleLoginButton user="mentor" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorLoginPage;
