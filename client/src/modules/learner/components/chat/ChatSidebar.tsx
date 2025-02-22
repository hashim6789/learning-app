// Chat Sidebar Component

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { selectGroup } from "../../../../store/slices/groupSlice";
import LoadingComponent from "../../../mentor/components/LoadingComponent";
import ErrorComponent from "../../../mentor/components/ErrorComponent";
import {
  fetchMessagesFailure,
  fetchMessagesStart,
  fetchMessagesSuccess,
} from "../../../../store/slices/messageSlice";
import api from "../../../../shared/utils/api";

interface ChatSidebarProps {}

const ChatSidebar = ({}: ChatSidebarProps) => {
  const { groups, selectedGroupId, loading, error } = useSelector(
    (state: RootState) => state.group
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleGroupChat = async (groupId: string) => {
    try {
      dispatch(fetchMessagesStart());
      const response = await api.get(`/api/chats/groups/${groupId}/messages`);
      if (response && response.status === 200) {
        dispatch(selectGroup(groupId));
        dispatch(fetchMessagesSuccess(response.data.data));
      }
    } catch (error: any) {
      dispatch(fetchMessagesFailure(error.response.data.message));
      console.error(error);
    }
  };

  return (
    <aside className="w-64 border-r bg-white h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Course Groups</h2>
      </div>
      <div className="py-2">
        {loading && <LoadingComponent item="groups" theme="blue" />}
        {error && <ErrorComponent item="groups" theme="blue" />}
        {!loading &&
          !error &&
          groups.map((group) => (
            <button
              key={group._id}
              onClick={() => handleGroupChat(group._id)}
              className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-150
                ${selectedGroupId === group._id ? "bg-blue-50" : ""}`}
            >
              <img
                src={group.thumbnail}
                alt="Course Thumbnail"
                className={`h-8 w-8 rounded-full ${
                  selectedGroupId === group._id
                    ? "border-blue-600"
                    : "border-gray-500"
                }`}
              />
              <div className="text-left">
                <p
                  className={`font-medium ${
                    selectedGroupId === group._id
                      ? "text-blue-600"
                      : "text-gray-800"
                  }`}
                >
                  {group.title}
                </p>
                <p className="text-sm text-gray-500">
                  {group.memberCount + 1} members
                </p>
              </div>
            </button>
          ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
