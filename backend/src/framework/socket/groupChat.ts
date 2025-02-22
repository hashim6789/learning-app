// src/infrastructure/socket/groupChat.ts
import { Server as SocketIOServer, Socket } from "socket.io";

export const handleGroupChat = (io: SocketIOServer, socket: Socket): void => {
  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });

  socket.on("leaveGroup", (groupId) => {
    socket.leave(groupId);
    console.log(`User ${socket.id} left group ${groupId}`);
  });

  socket.on("sendMessage", (data) => {
    const { groupId, message } = data;
    io.to(groupId).emit("receiveMessage", { message, sender: socket.id });
    console.log(`Message sent to group ${groupId} from user ${socket.id}`);
  });

  socket.on("sendNotification", (data) => {
    const { groupId, notification } = data;
    io.to(groupId).emit("receiveNotification", notification);
    console.log("Notification sent to group:", groupId);
  });
};
