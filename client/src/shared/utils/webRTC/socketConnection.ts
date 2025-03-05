import { io, Socket } from "socket.io-client";
import { config } from "../../configs/config";

let socket: Socket;
const socketConnection = (userName: string) => {
  //check to see if the socket is already connected
  if (socket && socket.connected) {
    console.log("connected");
    //if so, then just return it so whoever needs it, can use it
    return socket;
  } else {
    //its not connected... connect!
    // socket = io.connect('http://localhost:8181',{
    socket = io(`${config.API_BASE_URL}/calls`, {
      auth: {
        // jwt,
        password: "x",
        userName,
        roomId: "123456",
      },
    });
    if (userName == "test") {
      console.log("Testing...");
      const ping = socket.emitWithAck("test").then((resp) => {
        console.log(resp);
      });
    }

    return socket;
  }
};

export default socketConnection;
