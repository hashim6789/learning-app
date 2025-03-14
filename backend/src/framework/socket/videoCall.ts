import { Namespace, Socket } from "socket.io";

const emailToSocketIdMap = new Map<string, string>();
const socketidToEmailMap = new Map<string, string>();

export const handleVideoCall = (namespace: Namespace, socket: Socket): void => {
  console.log("Socket Connected", socket.id);

  socket.on("room:join", ({ email, room }) => {
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    socket.join(room);

    console.log(emailToSocketIdMap, socketidToEmailMap);

    namespace.to(room).emit("user:joined", { email, id: socket.id });
    namespace.to(socket.id).emit("room:join", { email, room });
  });

  socket.on("user:call", ({ to, offer }) => {
    namespace.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    namespace.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    emailToSocketIdMap.delete(socketidToEmailMap.get(socket.id) || "");
    socketidToEmailMap.delete(socket.id);
  });
};
// const rooms: { [key: string]: string[] } = {}; // Store active rooms
// export const handleVideoCall = (namespace: Namespace, socket: Socket): void => {
//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     if (!rooms[roomId]) rooms[roomId] = [];
//     rooms[roomId].push(socket.id);
//     console.log("joined", rooms);
//     // console.log(`User ${socket.id} joined room ${roomId}`);
//   });

//   socket.on("offer", ({ roomId, offer }) => {
//     console.log(rooms, "offer");
//     socket.to(roomId).emit("offer", { offer });
//   });

//   socket.on("answer", ({ roomId, answer }) => {
//     console.log(rooms, "answer");
//     socket.to(roomId).emit("answer", { answer });
//   });

//   socket.on("ice-candidate", ({ roomId, candidate }) => {
//     console.log(rooms, "ice");
//     socket.to(roomId).emit("ice-candidate", candidate);
//   });

//   socket.on("leaveRoom", (roomId) => {
//     socket.leave(roomId);
//     rooms[roomId] = rooms[roomId]?.filter((id) => id !== socket.id) || [];
//     if (rooms[roomId].length === 0) delete rooms[roomId];
//     console.log(`User ${socket.id} left room ${roomId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// };

/**------------------------------------------------------------------------- */
/**------------------------------------------------------------------------- */
/**------------------------------------------------------------------------- */
/**------------------------------------------------------------------------- */
/**------------------------------------------------------------------------- */
// // src/infrastructure/socket/groupChat.ts
// const offers: { [roomId: string]: RTCSessionDescriptionInit } = {};

// export const handleVideoCall = (namespace: Namespace, socket: Socket): void => {
//   console.log("CALL SOCKET User connected:", socket.id);

//   socket.on("joinRoom", (roomId: string) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room ${roomId}`);

//     // Send stored offer if available
//     if (offers[roomId]) {
//       console.log(`Sending stored offer to ${socket.id}`);
//       socket.emit("offer", { offer: offers[roomId], roomId });
//     }
//   });

//   socket.on(
//     "offer",
//     (data: { roomId: string; offer: RTCSessionDescriptionInit }) => {
//       console.log("Received offer:");
//       // console.log("Received offer:", data);
//       offers[data.roomId] = data.offer; // Store offer
//       socket.to(data.roomId).emit("offer", data.offer);
//     }
//   );

//   socket.on(
//     "answer",
//     (data: { roomId: string; answer: RTCSessionDescriptionInit }) => {
//       console.log("Received answer:");
//       // console.log("Received answer:", data);
//       socket.to(data.roomId).emit("answer", data.answer);
//     }
//   );

//   socket.on(
//     "ice-candidate",
//     (data: { roomId: string; candidate: RTCIceCandidateInit }) => {
//       console.log("ICE Candidate:");
//       // console.log("ICE Candidate:", data);
//       socket.to(data.roomId).emit("ice-candidate", data.candidate);
//     }
//   );

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// };

/**------------------------------------------------------------------------------------- */
/**------------------------------------------------------------------------------------- */
/**------------------------------------------------------------------------------------- */
/**------------------------------------------------------------------------------------- */
/**------------------------------------------------------------------------------------- */
// interface IceCandidateObj {
//   didIOffer: boolean;
//   iceUserName: string;
//   iceCandidate: RTCIceCandidate;
// }

// interface Offer {
//   offererUserName: string;
//   offer: RTCSessionDescriptionInit;
//   offerIceCandidates: RTCIceCandidate[];
//   answererUserName: string | null;
//   answer: RTCSessionDescriptionInit | null;
//   answererIceCandidates: RTCIceCandidate[];
// }

// interface ConnectedSocket {
//   socketId: string;
//   userName: string;
//   roomId: string;
// }

// const connectedSockets: ConnectedSocket[] = [];
// const offers: Offer[] = [];

// export const handleVideoCall = (namespace: Namespace, socket: Socket): void => {
//   const userName = socket.handshake.auth.userName;
//   const password = socket.handshake.auth.password;
//   const roomId = socket.handshake.auth.roomId;

//   if (password !== "x") {
//     socket.disconnect(true);
//     return;
//   }

//   connectedSockets.push({
//     socketId: socket.id,
//     userName,
//     roomId,
//   });

//   socket.join(roomId);
//   console.log(connectedSockets);
//   socket.emit("setup", { connected: true });

//   if (offers.length > 0) {
//     console.log("offer emitted", offers.length);
//     socket.emit("availableOffers", offers);
//   }

//   socket.on("newOffer", (newOffer: RTCSessionDescriptionInit) => {
//     offers.push({
//       offererUserName: userName,
//       offer: newOffer,
//       offerIceCandidates: [],
//       answererUserName: null,
//       answer: null,
//       answererIceCandidates: [],
//     });
//     // console.log(offers[offers.length - 1]);
//     socket.broadcast.emit("newOfferAwaiting", offers.slice(-1));
//   });

//   socket.on(
//     "newAnswer",
//     (
//       offerObj: Offer,
//       ackFunction: (iceCandidates: RTCIceCandidate[]) => void
//     ) => {
//       const socketToAnswer = connectedSockets.find(
//         (s) => s.userName === offerObj.offererUserName
//       );
//       if (!socketToAnswer) {
//         console.log("No matching socket");
//         return;
//       }
//       const socketIdToAnswer = socketToAnswer.socketId;
//       const offerToUpdate = offers.find(
//         (o) => o.offererUserName === offerObj.offererUserName
//       );
//       if (!offerToUpdate) {
//         console.log("No OfferToUpdate");
//         return;
//       }
//       ackFunction(offerToUpdate.offerIceCandidates);
//       offerToUpdate.answer = offerObj.answer;
//       offerToUpdate.answererUserName = userName;
//       socket.to(socketIdToAnswer).emit("answerResponse", offerToUpdate);
//     }
//   );

//   socket.on(
//     "sendIceCandidateToSignalingServer",
//     (iceCandidateObj: IceCandidateObj) => {
//       const { didIOffer, iceUserName, iceCandidate } = iceCandidateObj;

//       if (didIOffer) {
//         const offerInOffers = offers.find(
//           (o) => o.offererUserName === iceUserName
//         );
//         if (offerInOffers) {
//           console.log("iceCandidateObj", offerInOffers);
//           offerInOffers.offerIceCandidates.push(iceCandidate);
//           if (offerInOffers.answererUserName) {
//             const socketToSendTo = connectedSockets.find(
//               (s) => s.userName === offerInOffers.answererUserName
//             );
//             if (socketToSendTo) {
//               socket
//                 .to(socketToSendTo.socketId)
//                 .emit("receivedIceCandidateFromServer", iceCandidate);
//             } else {
//               console.log("Ice candidate received but could not find answerer");
//             }
//           }
//         }
//       } else {
//         const offerInOffers = offers.find(
//           (o) => o.answererUserName === iceUserName
//         );
//         const socketToSendTo = connectedSockets.find(
//           (s) => s.userName === offerInOffers?.offererUserName
//         );
//         if (socketToSendTo) {
//           socket
//             .to(socketToSendTo.socketId)
//             .emit("receivedIceCandidateFromServer", iceCandidate);
//         } else {
//           console.log("Ice candidate received but could not find offerer");
//         }
//       }
//     }
//   );

//   socket.on("disconnect", () => {
//     const offerToClear = offers.findIndex(
//       (o) => o.offererUserName === userName
//     );
//     offers.splice(offerToClear, 1);
//     socket.emit("availableOffers", offers);
//   });
// };

/**--------------------------------------------------------------------------- */
/**--------------------------------------------------------------------------- */
/**--------------------------------------------------------------------------- */

// socket.on("call:invite", (data) => {
//   namespace.to(data.userId).emit(`meet:invite-${data.userId}`, data);
// });

// socket.on("call:accepted", (data) => {
//   namespace.emit(`call:join-${data.roomId}`);
// });
// socket.on("call:declined", (data) => {
//   namespace.emit(`call:declined-${data.roomId}`);
// });
