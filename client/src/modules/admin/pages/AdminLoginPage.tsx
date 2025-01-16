import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { AuthLoginCredentials } from "../../../DTOS/AuthLoginCredentials";
import { validateCredentials } from "../../../DTOS/authValidator";

const AdminLoginPage: React.FC = () => {
  const { loading, error, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = new AuthLoginCredentials();
    credentials.email = email;
    credentials.password = password;

    // Validate the login credentials
    const validationErrors = await validateCredentials<AuthLoginCredentials>(
      credentials
    );

    console.log(validationErrors);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      handleLogin(credentials, "admin");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-red-500">
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Admin Portal</h2>
          <p className="text-lg">Manage your platform with ease.</p>
        </div>
        <img
          src="/api/placeholder/800/600"
          alt="Admin"
          className="object-cover w-full h-full opacity-75"
        />
      </div>

      {/* Right side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2 text-red-600">
              Admin Login
            </h1>
            <p className="text-gray-600">Access your admin dashboard.</p>
          </div>

          {/* Show Errors if Any */}
          {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-700">
                  {error}
                </p>
              ))}
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <p className="text-red-600">Processing...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              disabled={loading}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
