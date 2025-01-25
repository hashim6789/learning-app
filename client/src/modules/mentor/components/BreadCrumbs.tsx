import { useNavigate } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { Path } from "../../../shared/types/Path";

interface BreadcrumbsProps {
  paths: Path[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
      <button
        onClick={() => navigate("/mentor/dashboard")}
        className="hover:text-purple-700 flex items-center"
      >
        <Home className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Dashboard</span>
      </button>
      {paths.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {index === paths.length - 1 ? (
            <span className="text-purple-600 font-semibold">{item.title}</span>
          ) : (
            <button
              onClick={() => navigate(item.link)}
              className="hover:text-purple-700"
            >
              {item.title}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
