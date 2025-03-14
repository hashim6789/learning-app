import { ExpressPeerServer } from "peer";
import { Application } from "express";
import { Server as HttpServer } from "http";

export const connectPeer = (server: HttpServer, app: Application) => {
  const peerServer = ExpressPeerServer(server, {
    path: "/my-peerjs", // PeerJS Path
  });

  app.use(peerServer); // PeerJS Server Route
};
