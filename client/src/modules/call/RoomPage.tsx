// // RoomPage.tsx
// import React, { useEffect, useCallback, useState, useRef } from "react";
// import ReactPlayer from "react-player";
// import { useSocket } from "../../context/socketContext";
// import peer from "../../shared/utils/webRTC/peer";

// const RoomPage: React.FC = () => {
//   const socket = useSocket();
//   const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
//   const [myStream, setMyStream] = useState<MediaStream | null>(null);
//   //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   const handleUserJoined = useCallback(
//     ({ email, id }: { email: string; id: string }) => {
//       setRemoteSocketId(id);
//     },
//     []
//   );

//   const handleCallUser = useCallback(async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     const offer = await peer.getOffer();
//     socket.emit("user:call", { to: remoteSocketId, offer });
//     setMyStream(stream);
//   }, [remoteSocketId, socket]);

//   const handleIncommingCall = useCallback(
//     async ({
//       from,
//       offer,
//     }: {
//       from: string;
//       offer: RTCSessionDescriptionInit;
//     }) => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setMyStream(stream);
//       const ans = await peer.getAnswer(offer);
//       socket.emit("call:accepted", { to: from, ans });
//     },
//     [socket]
//   );

//   const handleCallAccepted = useCallback(
//     ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
//       peer.setLocalDescription(ans);
//     },
//     []
//   );

//   useEffect(() => {
//     socket.on("user:joined", handleUserJoined);
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);

//     return () => {
//       socket.off("user:joined", handleUserJoined);
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//     };
//   }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted]);

//   return (
//     // <div>
//     //   <h1>Room Page</h1>
//     //   {remoteSocketId ? <button onClick={handleCallUser}>Call</button> : <h4>No one in room</h4>}
//     //   {myStream && <ReactPlayer playing muted url={URL.createObjectURL(myStream)} />}
//     //   {remoteStream && <ReactPlayer playing url={URL.createObjectURL(remoteStream)} />}
//     // </div>

//     <div>
//       <h1>Room Page</h1>
//       {remoteSocketId ? (
//         <button onClick={handleCallUser}>Call</button>
//       ) : (
//         <h4>No one in room</h4>
//       )}
//       {myStream && (
//         <video
//           playsInline
//           muted
//           autoPlay
//           ref={(video) => {
//             if (video) video.srcObject = myStream;
//           }}
//         />
//       )}
//       <video playsInline autoPlay ref={remoteVideoRef} />
//     </div>
//   );
// };

// export default RoomPage;
