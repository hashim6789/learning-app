// src/infrastructure/socket/groupChat.ts
import { Server as SocketIOServer, Socket } from "socket.io";
import { generateUniqueKey } from "../../shared/utils/uuid.util";
interface MeetData {
  email: string;
  roomId: string;
  learnerId: string;
}

export const handleVideoCall = (io: SocketIOServer, socket: Socket): void => {
  socket.on("call:invite", (data) => {
    io.to(data.userId).emit(`meet:invite-${data.userId}`, data);
  });

  socket.on("call:accepted", (data) => {
    io.emit(`call:join-${data.roomId}`);
  });
  socket.on("call:declined", (data) => {
    io.emit(`call:declined-${data.roomId}`);
  });
};
