// src/infrastructure/socket/socketSetup.ts
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { handleGroupChat } from "./groupChat";
import { handleNotification } from "./notification";

let io: SocketIOServer | undefined;

export const connectSocket = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    if (io) {
      handleNotification(io, socket);
    }

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  // Namespace for Chats
  const chatNamespace = io.of("/chats");
  chatNamespace.on("connection", (socket) => {
    console.log("A user connected to /chats namespace:", socket.id);
    handleGroupChat(chatNamespace, socket); // Pass Namespace instead of Server
    socket.on("disconnect", () => {
      console.log("A user disconnected from /chats namespace:", socket.id);
    });
  });

  return io;
};

export const getIo = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

// // Namespace for Video Calls
// const callNamespace = io.of("/calls");
// callNamespace.on("connection", (socket) => {
//   handleVideoCall(callNamespace, socket); // Pass Namespace instead of Server
//   socket.on("disconnect", () => {
//     console.log("A user disconnected from /calls namespace:", socket.id);
//   });
// });

// Namespace for Notifications
// const notificationNamespace = io.of("/notify");
// notificationNamespace.on("connection", (socket) => {
//   console.log("A user connected to /notify namespace:", socket.id);
//   handleNotification(notificationNamespace, socket); // Pass Namespace instead of Server
//   socket.on("disconnect", () => {
//     console.log("A user disconnected from /notify namespace:", socket.id);
//   });
// });
