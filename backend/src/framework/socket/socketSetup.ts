// src/infrastructure/socket/socketSetup.ts
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | undefined;

export const connectSocket = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3000", // Update with your client URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (mentorId) => {
      socket.join(mentorId);
      console.log(`Mentor ${mentorId} joined room ${mentorId}`);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });

    socket.on("sendNotification", (data) => {
      if (io) {
        const { mentorId, notification } = data;
        console.log("Sending notification to mentor:", mentorId);
        io.to(mentorId).emit("receiveNotification", notification);
      }
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
