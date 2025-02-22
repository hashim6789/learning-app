import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../store";
import { addMessage } from "../../../../store/slices/messageSlice";
import api from "../../../../shared/utils/api";
import userImage from "../../../../assets/img/user_image.avif";
import { format } from "date-fns";

import { useEffect } from "react";
import { Socket, io } from "socket.io-client";

interface MessageInputProps {}

interface FormData {
  message: string;
}

type Sender = {
  _id: string;
  name: string;
  profilePicture: string;
};

interface Message {
  _id: string;
  sender: Sender;
  message: string;
  createdAt: string;
}

const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

const MessageInput = ({}: MessageInputProps) => {
  const { selectedGroupId } = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");

    // Join group
    socket.emit("joinGroup", selectedGroupId);

    // Listen for receiveChat event
    socket.on("receiveChat", (data) => {
      console.log("received =", data);
      dispatch(addMessage(data));
      // setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.emit("leaveGroup", selectedGroupId);
      socket.off("receiveChat");
      socket.disconnect();
    };
  }, [selectedGroupId]);

  // const handleSendMessage = (message: string) => {
  //   const socket: Socket = io("http://localhost:3000");
  //   socket.emit("postMessage", { groupId, message });
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post(
        `api/chats/groups/${selectedGroupId}/message`,
        data
      );
      if (response && response.status === 200) {
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="border-t p-4 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            {...register("message")}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
          >
            <Send size={20} />
          </button>
        </div>
        {errors.message && (
          <p className="text-red-500 mt-2">{errors.message.message}</p>
        )}
      </form>
    </>
  );
};

export default MessageInput;
