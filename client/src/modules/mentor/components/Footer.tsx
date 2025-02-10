import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const Footer: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <footer
      className={`${
        theme === "dark"
          ? "dark bg-gray-900 border-gray-700 text-purple-300"
          : "bg-purple-100 border-purple-100 text-purple-800"
      }
        h-16 
        border-t
        flex items-center justify-center
      `}
    >
      © 2024 Mentor Dashboard. All rights reserved.
    </footer>
  );
};

export default Footer;
