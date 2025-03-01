// src/infrastructure/socket/groupChat.ts
import { Server as SocketIOServer, Socket, Namespace } from "socket.io";

export const handleNotification = (
  namespace: Namespace,
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
