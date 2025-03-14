import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  socket,
  getLocalStream,
  createPeerConnection,
} from "../../shared/utils/webRTC/webRTC.util";

interface VideoCallComponentProps {
  role: "mentor" | "learner";
}

const VideoCallComponent: React.FC<VideoCallComponentProps> = ({ role }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const setupWebRTC = async () => {
      if (!roomId || peerConnection.current) return; // Prevent duplicate connections

      try {
        // Get user media stream
        const stream = await getLocalStream();
        setLocalStream(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        // Create and store peer connection
        const pc = createPeerConnection(roomId, stream, remoteVideoRef);
        peerConnection.current = pc;

        if (role === "mentor") {
          // Mentor initiates the offer
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("offer", { roomId, offer });
        }
      } catch (error) {
        console.error("Error setting up WebRTC:", error);
      }
    };

    if (roomId) {
      socket.emit("joinRoom", roomId);
      setupWebRTC();
    }

    socket.on("offer", async ({ offer }) => {
      if (role === "learner" && peerConnection.current) {
        try {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(offer)
          );
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.emit("answer", { roomId, answer });
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      }
    });

    socket.on("answer", async (answer) => {
      if (peerConnection.current) {
        try {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        } catch (error) {
          console.error("Error setting remote description:", error);
        }
      }
    });

    socket.on("ice-candidate", async (candidate) => {
      if (peerConnection.current) {
        try {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    });

    return () => {
      console.log("Cleaning up WebRTC connection...");
      peerConnection.current?.close();
      peerConnection.current = null;
      socket.emit("leaveRoom", roomId);
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [roomId, role]);

  return (
    <div>
      <h2>Mentor</h2>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <h2>Learner</h2>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoCallComponent;
