import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  selectGroup,
  fetchGroupsFailure,
  fetchGroupsStart,
  fetchGroupsSuccess,
} from "../../../../store/slices/groupSlice";
import LoadingComponent from "../../../mentor/components/LoadingComponent";
import ErrorComponent from "../../../mentor/components/ErrorComponent";
import api from "../../../../shared/utils/api";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import {
  fetchMessagesFailure,
  fetchMessagesStart,
  fetchMessagesSuccess,
} from "../../../../store/slices/messageSlice";

interface ChatSidebarProps {
  socket: Socket;
}

const ChatSidebar = ({ socket }: ChatSidebarProps) => {
  const { groups, selectedGroupId, loading, error } = useSelector(
    (state: RootState) => state.group
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchGroups = async () => {
      dispatch(fetchGroupsStart());
      try {
        const response = await api.get("/api/chats/groups");
        if (response && response.status === 200) {
          dispatch(fetchGroupsSuccess(response.data.data));
        } else {
          dispatch(fetchGroupsFailure("failed to fetch groups"));
        }
      } catch (error: any) {
        dispatch(fetchGroupsFailure(error.response.data.message));
      }
    };

    fetchGroups();
  }, [dispatch]);

  useEffect(() => {
    if (selectedGroupId) {
      socket.emit("join chat", { groupId: selectedGroupId });
      console.log("user joined groupid", selectedGroupId);
    }

    () => {
      if (selectedGroupId) {
        socket.emit("leave chat", { groupId: selectedGroupId });
        console.log("user joined groupid", selectedGroupId);
      }
    };
  });

  const handleGroupChat = async (groupId: string) => {
    try {
      dispatch(fetchMessagesStart());
      const response = await api.get(`/api/chats/groups/${groupId}/messages`);
      if (response && response.status === 200) {
        socket.emit("leave chat", { groupId: selectedGroupId });
        console.log("user joined groupid", selectedGroupId);
        dispatch(selectGroup(groupId));
        dispatch(fetchMessagesSuccess(response.data.data));
        // socket.emit("join chat", { groupId });
        // console.log("user joined groupid", groupId);
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
