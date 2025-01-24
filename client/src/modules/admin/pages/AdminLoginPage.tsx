//imported the assets
import { Eye, EyeOff } from "lucide-react";
import loginImage from "../../../assets/img/wall_paper_03.jpg";

//imported the custom hooks
import useAdminLogin from "../hooks/useAdminLogin";

const AdminLoginPage: React.FC = () => {
  const {
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
  } = useAdminLogin();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-red-500 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Admin Portal</h2>
          <p className="text-lg">Manage your platform with ease.</p>
        </div>
        <div className="px-20 py-40">
          <img
            src={loginImage}
            alt="Admin"
            className="object-fit w-full h-full rounded-3xl opacity-100"
          />
        </div>
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
              {errors.email && (
                <div className="text-sm text-red-700">
                  {errors.email.map((message, index) => (
                    <p key={`${index}`} className="text-sm text-red-700">
                      {message}
                    </p>
                  ))}
                </div>
              )}
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
              {errors.password && (
                <div className="text-sm text-red-700">
                  {errors.password.map((message, index) => (
                    <p key={`${index}`} className="text-sm text-red-700">
                      {message}
                    </p>
                  ))}
                </div>
              )}
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
