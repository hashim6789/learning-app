import { LogOut, Menu, Moon, Settings, Sun, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { toggleTheme } from "../../../store/slices/themeSlice";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import userImage from "../../../assets/img/user_image.avif";
import NotificationPanel from "../../learner/components/NotificationPanel";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { handleLogout } = useAuth();
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();
  const changeTheme = (): void => {
    dispatch(toggleTheme());
  };

  const navigate = useNavigate();

  // Get mentor data from localStorage
  const mentorData = JSON.parse(localStorage.getItem("data") || "{}");
  const fullName = `${mentorData.firstName || ""} ${
    mentorData.lastName || ""
  }`.trim();
  const profileImage = mentorData.profilePicture;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const style =
    theme === "light"
      ? "hover:bg-purple-600 hover:text-purple-100"
      : "hover:bg-purple-100 hover:text-purple-600";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 transition-all duration-600 ease-in-out ${
        theme === "dark"
          ? "bg-gray-900 text-purple-300 border-gray-700"
          : "bg-purple-100 text-purple-800 border-purple-200"
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`${style} mr-4 p-2 rounded-md`}
        >
          <Menu />
        </button>
      </div>

      <div className="flex items-center space-x-4 relative">
        <NotificationPanel />
        <button onClick={changeTheme} className={`${style} p-2 rounded-md`}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-10 h-10 bg-purple-200 ${style} rounded-full flex items-center justify-center cursor-pointer`}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              onError={(e) => {
                e.currentTarget.src = userImage;
                e.currentTarget.alt = "Placeholder Image";
              }}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
              {getInitials(fullName)}
            </div>
          )}
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-16 w-64 bg-white rounded-lg shadow-lg py-2 border border-purple-100 z-10">
            <div className="px-4 py-3 border-b border-purple-100">
              <p className="text-sm font-semibold text-gray-800">{fullName}</p>
              <p className="text-xs text-gray-500 truncate">
                {mentorData.email}
              </p>
            </div>

            <button
              onClick={() => navigate("/mentor/profile")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2 transition-colors duration-200"
            >
              <User className="w-4 h-4 text-purple-500" />
              Profile
            </button>

            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2 transition-colors duration-200">
              <Settings className="w-4 h-4 text-purple-500" />
              Settings
            </button>

            <div className="border-t border-purple-100 my-1"></div>

            <button
              onClick={() => handleLogout("mentor")}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// ${
//   theme === "dark"
//     ? "dark bg-gray-900 text-purple-300 border-purple-800"
//     : "bg-purple-100 text-purple-800 border-purple-200"
// }

// text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800

// text-purple-800 dark:text-purple-300 hover:text-purple-200 dark:hover:text-purple-50 hover:bg-purple-100 dark:hover:bg-purple-700

// bg-white dark:bg-gray-800
// text-purple-700 dark:text-white
