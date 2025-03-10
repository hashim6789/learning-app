// // src/infrastructure/socket/socketSetup.ts
// import { Server as HttpServer } from "http";
// import { Server as SocketIOServer } from "socket.io";

// let io: SocketIOServer | undefined;

// export const connectSocket = (server: HttpServer): SocketIOServer => {
//   io = new SocketIOServer(server, {
//     cors: {
//       origin: "http://localhost:3000", // Update with your client URL
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     socket.on("joinRoom", (mentorId) => {
//       socket.join(mentorId);
//       console.log(`Mentor ${mentorId} joined room ${mentorId}`);
//     });

//     socket.on("disconnect", () => {
//       console.log("A user disconnected:", socket.id);
//     });

//     socket.on("sendNotification", (data) => {
//       if (io) {
//         const { mentorId, notification } = data;
//         console.log("Sending notification to mentor:", mentorId);
//         io.to(mentorId).emit("receiveNotification", notification);
//       }
//     });
//   });

//   return io;
// };

// export const getIo = (): SocketIOServer => {
//   if (!io) {
//     throw new Error("Socket.io not initialized!");
//   }
//   return io;
// };

// src/infrastructure/socket/socketSetup.ts
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { handleGroupChat } from "./groupChat";
import { handleNotification } from "./notification";
import { handleVideoCall } from "./videoCall";

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
      handleGroupChat(io, socket);
      handleNotification(io, socket);
      handleVideoCall(io, socket);
    }

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
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
