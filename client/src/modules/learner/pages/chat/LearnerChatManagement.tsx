import { useEffect, useState } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import MessageInput from "../../components/chat/MessageInput";
import GroupInfoSidebar from "../../components/chat/GroupInfoSidebar";
import ChatMessages from "../../components/chat/ChatMessages";
import api from "../../../../shared/utils/api";
import {
  fetchGroupsFailure,
  fetchGroupsStart,
  fetchGroupsSuccess,
} from "../../../../store/slices/groupSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";

const MainChatLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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

  return (
    <div className="h-[600px] w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg flex overflow-hidden">
      {/* Main chat area */}
      <div className={`md:block ${showSidebar ? "hidden" : "block"} md:w-64`}>
        <ChatSidebar />
      </div>

      {/* Chat content */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          onMenuClick={() => setShowSidebar(!showSidebar)}
          onInfoClick={() => setShowInfo(!showInfo)}
        />
        <div className="flex-1 flex overflow-hidden">
          <div
            className={`flex-1 flex flex-col ${
              showInfo ? "hidden md:flex" : "flex"
            }`}
          >
            <ChatMessages />
            <MessageInput />
          </div>
          {showInfo && <GroupInfoSidebar onClose={() => setShowInfo(false)} />}
        </div>
      </div>
    </div>
  );
};

export default MainChatLayout;
