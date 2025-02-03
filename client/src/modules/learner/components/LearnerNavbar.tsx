import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import NotificationPanel from "./NotificationPanel";

const CourseraNavbar: React.FC = () => {
  const { handleLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Redux state selectors
  const { isAuthenticated, isVerified, isBlocked } = useSelector(
    (state: RootState) => state.auth
  );
  const user = JSON.parse(localStorage.getItem("data") ?? "{}");

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-full px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-blue-600 font-bold text-2xl">
              EazyDev
            </Link>
            <div className="relative">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-1">
                <span>Explore</span>
                <span className="text-gray-400">▾</span>
              </button>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className={`w-full pl-10 pr-4 py-2 border ${
                  isSearchFocused ? "border-blue-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-blue-500`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && !isBlocked && isVerified ? (
              <>
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <NotificationPanel />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white">
                      {user?.firstName?.[0] ?? "M"}
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
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
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => handleLogout("learner")}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Login / Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="flex space-x-8 h-12">
          <Link
            to="/"
            className="text-blue-600 border-b-2 border-blue-600 flex items-center px-1"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 flex items-center px-1"
          >
            My Learning
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 flex items-center px-1"
          >
            Online Degrees
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 flex items-center px-1"
          >
            Careers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CourseraNavbar;
