// ChatHeader.tsx
import { Users, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface ChatHeaderProps {
  onMenuClick: () => void;
  onInfoClick: () => void;
}

const ChatHeader = ({ onMenuClick, onInfoClick }: ChatHeaderProps) => {
  const { groups, selectedGroupId } = useSelector(
    (state: RootState) => state.group
  );
  const group = groups.find((group) => group._id === selectedGroupId);
  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        >
          <Menu size={20} />
        </button>
        {group && (
          <div>
            <h2 className="font-semibold text-gray-800">{group.title}</h2>
            <p className="text-sm text-gray-500">
              {group.memberCount} participants
            </p>
          </div>
        )}
      </div>
      <button
        onClick={onInfoClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
      >
        <Users size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeader;
