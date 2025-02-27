// // features/socket/socketSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import { initializeSocket, getSocket, disconnectSocket } from "../../socketManager"; // Adjust the import path

// // socketManager.ts
// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// interface Meeting {
//   _id: string;
//   roomId: string;
//   course: string;
// }

// export const initializeSocket = (): Socket => {
//   if (!socket) {
//     socket = io("http://localhost:3000", {
//       transports: ["websocket"],
//       upgrade: false,
//     });
//   }
//   return socket;
// };

// export const getSocket = (): Socket | null => socket;

// export const disconnectSockett = (): void => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

// export const listenInvite = (): void => {
//   if (socket) {
//     socket.on("meet:invite", (meet: Meeting) => {
//       console.log("invitation recieved");
//       setMeetingInvitation(meet);
//     });
//   }
// };

// interface MeetingInvitation {
//   learnerName: string;
//   course: string;
// }

// interface SocketState {
//   isConnected: boolean;
//   meetingInvitation: Meeting | null;
// }

// const initialState: SocketState = {
//   isConnected: false,
//   meetingInvitation: null,
// };

// const socketSlice = createSlice({
//   name: "socket",
//   initialState,
//   reducers: {
//     connectSocket(state) {
//       initializeSocket();
//       state.isConnected = true;
//       console.log("connected =", state.isConnected);
//     },
//     disconnectSocket(state) {
//       disconnectSockett();
//       state.isConnected = false;
//       console.log("connected =", state.isConnected);
//     },
//     setSocketState(state, action: PayloadAction<boolean>) {
//       state.isConnected = action.payload;
//     },
//     startMeeting(state, action: PayloadAction<string>) {
//       if (socket) {
//         socket.emit("meet:start", { email: action.payload });
//       }
//     },

//     setMeetingInvitation(state, action: PayloadAction<Meeting>) {
//       state.meetingInvitation = action.payload;
//     },
//     clearMeetingInvitation(state) {
//       state.meetingInvitation = null;
//     },

//     acceptInvitation(state) {
//       console.log("call accepted");
//       if (socket) {
//         socket.emit("meet:accepted");
//       }
//     },
//   },
// });

// export const {
//   connectSocket,
//   disconnectSocket,
//   setSocketState,
//   startMeeting,
//   setMeetingInvitation,
//   clearMeetingInvitation,
// } = socketSlice.actions;
// export default socketSlice.reducer;
