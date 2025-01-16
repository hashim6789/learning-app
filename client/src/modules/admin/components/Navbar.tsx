import { User } from "lucide-react";

import useAuth from "../../../hooks/useAuth";

const Navbar: React.FC = () => {
  const { handleLogout } = useAuth();

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-white border-b">
        <div className="text-xl font-semibold text-gray-800">
          <img src="/logo.svg" alt="EazyDev" className="h-8" />
        </div>
        <div className="flex items-center gap-2">
          <User className="w-6 h-6 text-gray-600" />
          <span className="text-sm font-medium">Admin</span>
          <button onClick={handleLogout} className="text-sm text-blue-500">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
