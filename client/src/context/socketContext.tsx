import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  useState,
} from "react";
import useSocket from "../modules/learner/hooks/useSocket";
import { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  test: string;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [test, setTest] = useState<string>("hello");
  const socketEventHandlers = [
    {
      event: "receiveMessage",
      handler: (data: any) => {
        console.log("received message =", data);
      },
    },
  ];

  const socketInstance = useSocket({
    url: "http://localhost:3000",
    namespace: "/chats",
    eventHandlers: socketEventHandlers,
  });

  useEffect(() => {
    setSocket(socketInstance);
    console.log("Socket initialized:", socketInstance);
  }, [socketInstance]);

  return (
    <SocketContext.Provider value={{ socket, test }}>
      {children}
    </SocketContext.Provider>
  );
};
