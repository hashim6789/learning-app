// // SocketProvider.tsx
// import React, { createContext, useMemo, useContext } from "react";
// import { io, Socket } from "socket.io-client";

// const SocketContext = createContext<Socket | null>(null);

// export const useSocket = () => {
//   const socket = useContext(SocketContext);
//   if (!socket) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return socket;
// };

// export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const socket = useMemo(() => io("http://localhost:3000/calls"), []);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };
