import type React from "react";
import { useState } from "react";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

interface MentorNavbarProps {
  mentorName?: string;
  profileImage?: string;
}

const Navbar: React.FC<MentorNavbarProps> = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { handleLogout } = useAuth();

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

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white border-b border-purple-100 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src="/api/placeholder/40/40"
          alt="EazyDev"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-2xl font-bold text-purple-600">EazyDev</span>
      </div>

      {/* Profile Section */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition-colors duration-200"
        >
          {profileImage ? (
            <img
              src={profileImage || "/placeholder.svg"}
              alt={fullName}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
              {getInitials(fullName)}
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">{fullName}</p>
              <p className="text-xs text-gray-500">{mentorData.email}</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 border border-purple-100">
            <div className="px-4 py-3 border-b border-purple-100">
              <p className="text-sm font-semibold text-gray-800">{fullName}</p>
              <p className="text-xs text-gray-500 truncate">
                {mentorData.email}
              </p>
            </div>

            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2 transition-colors duration-200">
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
