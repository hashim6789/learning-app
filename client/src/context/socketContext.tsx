// import React, { createContext, useState, useEffect, useContext } from "react";
// import { io, Socket } from "socket.io-client";

// export const SocketContext = createContext<Socket | null>(null);

// const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io("http://localhost:3000");
//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (context === null) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return context;
// };

// export default SocketProvider;
