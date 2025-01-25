import React from "react";
import { Link } from "react-router-dom";

//imported custom hooks
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

//imported build-in hooks
import useAuth from "../../../hooks/useAuth";

//imported build-in ui components
import { AlertCircle, AlertTriangle } from "lucide-react";

//child components
interface AlertProps {
  type: "blocked" | "unverified";
}

const LearnerAlert: React.FC<AlertProps> = ({ type }) => {
  const alertConfig = {
    blocked: {
      icon: AlertCircle,
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-400",
      message: "Your account has been blocked. Please contact support.",
    },
    unverified: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-400",
      message: "Please verify your email to access full platform features.",
    },
  };

  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        w-full 
        ${config.bgColor} 
        ${config.textColor} 
        ${config.borderColor}
        border 
        p-4 
        rounded-lg 
        flex 
        items-center 
        space-x-4
        shadow-md
      `}
      role="alert"
    >
      <Icon className="w-6 h-6" />
      <div className="flex-1">
        <p className="text-sm font-medium">{config.message}</p>
      </div>
    </div>
  );
};

interface NavbarProps {
  className?: string;
}

const LearnerNavbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const { handleLogout } = useAuth();

  // Redux state selectors
  const { isAuthenticated, isVerified, isBlocked } = useSelector(
    (state: RootState) => state.auth
  );

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const user = JSON.parse(localStorage.getItem("data") ?? "{}");

  // Unauthenticated navbar
  if (!isAuthenticated) {
    return (
      <>
        <nav
          className={`flex items-center justify-between px-6 py-3 bg-white shadow-md ${className}`}
        >
          <div className="flex items-center">
            <Link
              to="/"
              className="text-teal-500 transition hover:text-teal-600"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path
                  fill="currentColor"
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                />
              </svg>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Courses
            </Link>
            <Link
              to="/careers"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Careers
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              About Us
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200"
              >
                Login / Register
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  }

  // Render authenticated navbar
  return (
    <>
      <nav
        className={`flex items-center justify-between px-6 py-3 bg-white shadow-md ${className}`}
      >
        <div className="flex items-center">
          <Link to="/" className="text-teal-500 transition hover:text-teal-600">
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path
                fill="currentColor"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-gray-600 hover:text-gray-900 transition duration-200"
          >
            Courses
          </Link>
          <Link
            to="/careers"
            className="text-gray-600 hover:text-gray-900 transition duration-200"
          >
            Careers
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-gray-900 transition duration-200"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 transition duration-200"
          >
            About Us
          </Link>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-teal-500"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  {user?.firstName?.[0] ?? "S"}
                </div>
              )}
              <span className="text-gray-700 font-medium">
                {user?.firstName || "Student"}{" "}
                <span className="ml-1 text-gray-400">▾</span>
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <button
                  onClick={() => handleLogout("learner")}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {isBlocked && <LearnerAlert type="blocked" />}
      {!isVerified && <LearnerAlert type="unverified" />}
    </>
  );
};

export default LearnerNavbar;
