import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

// Interface definitions
interface NavbarProps {
  className?: string;
}

// Navbar Component
const LearnerNavbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const { handleLogout } = useAuth();
  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center">
        <Link to="/" className="text-teal-500">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              fill="currentColor"
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            />
          </svg>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <Link to="/courses" className="text-gray-600 hover:text-gray-900">
          Courses
        </Link>
        <Link to="/careers" className="text-gray-600 hover:text-gray-900">
          Careers
        </Link>
        <Link to="/blog" className="text-gray-600 hover:text-gray-900">
          Blog
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900">
          About Us
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <span className="text-gray-600">Student ▾</span>
        </div>
        <button
          onClick={() => handleLogout("learner")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default LearnerNavbar;
