// VideoCallComponent.tsx
import React, { useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface VideoCallComponentProps {
  roomId: string;
}

const VideoCallComponent: React.FC<VideoCallComponentProps> = ({ roomId }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);
    const socket = io("http://localhost:3000/calls");
    setSocket(socket);

    // Join the room
    socket.emit("join", roomId);

    // Get local stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      });

    // Handle incoming remote stream
    pc.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    // Handle signaling messages
    socket.on("message", async (data) => {
      if (data.roomId !== roomId) return;

      switch (data.type) {
        case "offer":
          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("message", { type: "answer", answer, roomId });
          break;
        case "answer":
          await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          break;
        case "ice-candidate":
          if (data.candidate) {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
          break;
      }
    });

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("message", {
          type: "ice-candidate",
          candidate: event.candidate,
          roomId,
        });
      }
    };

    return () => {
      pc.close();
      socket.disconnect();
    };
  }, [roomId]);

  const startCall = async () => {
    if (peerConnection && socket) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit("message", { type: "offer", offer, roomId });
    }
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoCallComponent;
