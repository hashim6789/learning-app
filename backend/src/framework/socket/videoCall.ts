// src/infrastructure/socket/groupChat.ts
import { Server as SocketIOServer, Socket, Namespace } from "socket.io";
import { generateUniqueKey } from "../../shared/utils/uuid.util";
interface MeetData {
  email: string;
  roomId: string;
  learnerId: string;
}

export const handleVideoCall = (namespace: Namespace, socket: Socket): void => {
  socket.on("call:invite", (data) => {
    namespace.to(data.userId).emit(`meet:invite-${data.userId}`, data);
  });

  socket.on("call:accepted", (data) => {
    namespace.emit(`call:join-${data.roomId}`);
  });
  socket.on("call:declined", (data) => {
    namespace.emit(`call:declined-${data.roomId}`);
  });
};
