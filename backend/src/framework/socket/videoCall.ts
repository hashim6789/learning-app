// src/infrastructure/socket/groupChat.ts
import { Socket, Namespace } from "socket.io";
export const handleVideoCall = (namespace: Namespace, socket: Socket): void => {
  console.log("CALL SOCKET User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Joined : User ${socket.id} joined room ${roomId}`);
  });

  socket.on("offer", (data) => {
    console.log("Offer : data=", data);
    socket.to(data.roomId).emit("offer", data.offer);
  });

  socket.on("answer", (data) => {
    console.log("Answer : data=", data);
    socket.to(data.roomId).emit("answer", data.answer);
  });

  socket.on("ice-candidate", (data) => {
    console.log("ICE : data=", data);
    socket.to(data.roomId).emit("ice-candidate", data.candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};

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
