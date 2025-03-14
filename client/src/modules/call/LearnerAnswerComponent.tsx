// LearnerAnswerComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  socket,
  getLocalStream,
  createPeerConnection,
} from "../../shared/utils/webRTC/webRTC.util";

const LearnerAnswerComponent: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const setupWebRTC = async () => {
      const stream = await getLocalStream();
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (roomId) {
        const pc = createPeerConnection(roomId, stream, remoteVideoRef);
        peerConnection.current = pc;
      }
    };

    socket.emit("joinRoom", roomId);
    setupWebRTC();

    socket.on("offer", async ({ offer }) => {
      if (!peerConnection.current) return;
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { roomId, answer });
    });

    socket.on("ice-candidate", (candidate) => {
      peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      peerConnection.current?.close();
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  return (
    <div>
      <h2>Learner</h2>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <h2>Mentor</h2>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default LearnerAnswerComponent;
