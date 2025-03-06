import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000/calls");

const MentorOfferComponent: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    console.log("Mentor: Joining room", roomId);
    socket.emit("joinRoom", roomId);

    const setupWebRTC = async () => {
      console.log("Mentor: Setting up WebRTC");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Mentor: Emitting ICE candidate", event.candidate);
          socket.emit("ice-candidate", { roomId, candidate: event.candidate });
        }
      };

      pc.ontrack = (event) => {
        console.log("Mentor: Receiving remote track");
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      const offer = await pc.createOffer();
      console.log("Mentor: Created offer", offer);
      await pc.setLocalDescription(offer);
      socket.emit("offer", { roomId, offer });

      peerConnection.current = pc;
    };

    setupWebRTC();

    socket.on("answer", async (answer) => {
      console.log("Mentor: Received answer", answer);
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    socket.on("ice-candidate", (candidate) => {
      console.log("Mentor: Received ICE candidate", candidate);
      if (peerConnection.current) {
        peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  return (
    <div>
      <h2>Mentor</h2>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <h2>Learner</h2>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default MentorOfferComponent;
