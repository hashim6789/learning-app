// src/infrastructure/socket/groupChat.ts
import { Server as SocketIOServer, Socket, Namespace } from "socket.io";

// src/infrastructure/socket/groupChat.ts
export const handleGroupChat = (namespace: Namespace, socket: Socket): void => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("room created and user joined", userData);
    socket.emit("connected");
  });

  socket.on("join chat", (roomData) => {
    socket.join(roomData.groupId);

    const roomSize = namespace.adapter.rooms.get(roomData.groupId)?.size || 0;
    console.log(
      "user joined the group",
      roomData.groupId,
      "room size =",
      roomSize
    );

    socket.to(roomData.groupId).emit("online", { onlineCount: roomSize });
  });

  socket.on("start typing", (typeData) =>
    socket
      .to(typeData.groupId)
      .emit("start typing", { typeName: typeData.firstName })
  );
  socket.on("stop typing", (roomData) =>
    socket.to(roomData.groupId).emit("stop typing")
  );

  socket.on("send message", (message) => {
    // console.log("message", message);

    socket.to(message.groupId).emit("receive message", message);
  });
  socket.on("leave chat", (roomData) => {
    socket.leave(roomData.groupId);
    const roomSize = namespace.adapter.rooms.get(roomData.groupId)?.size || 0;

    console.log(
      `User ${socket.id} left group ${roomData.groupId} room size =`,
      roomSize
    );

    socket.to(roomData.groupId).emit("online", { onlineCount: roomSize });
  });
  // socket.on("leaveGroup", (groupId) => {
  //   socket.leave(groupId);
  //   console.log(`User ${socket.id} left group ${groupId}`);
  // });
  // socket.emit("successConnection", true);
  // socket.on("joinGroup", (data: { groupId: string }) => {
  //   console.log("joinGroup event received with data:", data); // Add this line
  //   socket.join(data.groupId);
  //   console.log(`User ${socket.id} joined group ${data.groupId}`);
  // });

  // socket.on("sendMessage", (messageData) => {
  //   console.log("message", messageData);
  //   const { groupId } = messageData;
  //   namespace.to(groupId).emit("receiveMessage", messageData);
  //   console.log(`Message sent to group ${groupId} from user ${socket.id}`);
  // });

  // socket.on("sendNotification", (data) => {
  //   const { groupId, notification } = data;
  //   namespace.to(groupId).emit("receiveNotification", notification);
  //   console.log("Notification sent to group:", groupId);
  // });
};
