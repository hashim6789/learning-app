// src/infrastructure/socket/groupChat.ts
import { Server as SocketIOServer, Socket } from "socket.io";

export const handleNotification = (
  io: SocketIOServer,
  socket: Socket
): void => {
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
};
