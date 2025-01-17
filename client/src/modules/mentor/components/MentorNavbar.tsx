import { ChevronDown } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

interface MentorNavbarProps {
  mentorName: string;
  profileImage: string;
}

const Navbar: React.FC<MentorNavbarProps> = ({
  mentorName = "Student1",
  profileImage = "/api/placeholder/32/32",
}) => {
  const { handleLogout } = useAuth();
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-2">
        <img src="/api/placeholder/40/40" alt="EazyDev" className="h-10" />
        <span className="text-xl font-semibold text-blue-600">EazyDev</span>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={profileImage}
          alt={mentorName}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium text-blue-600">{mentorName}</span>
        <ChevronDown className="w-4 h-4 text-blue-500" />
        <button
          onClick={() => handleLogout("mentor")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
