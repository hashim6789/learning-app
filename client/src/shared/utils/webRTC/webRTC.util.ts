import io from "socket.io-client";

export const socket = io("http://localhost:3000/calls", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
});

export const getLocalStream = async (): Promise<MediaStream> => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  } catch (error) {
    console.error("Error accessing user media:", error);
    throw error;
  }
};

export const createPeerConnection = (
  roomId: string,
  localStream: MediaStream,
  remoteVideoRef: React.RefObject<HTMLVideoElement>
): RTCPeerConnection => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  // Add local tracks to peer connection
  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

  // Handle ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("Sending ICE candidate:", event.candidate);
      socket.emit("ice-candidate", { roomId, candidate: event.candidate });
    }
  };

  // Receive remote tracks
  pc.ontrack = (event) => {
    if (remoteVideoRef.current) {
      console.log("Received remote track");
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };

  pc.oniceconnectionstatechange = () => {
    console.log("ICE Connection State:", pc.iceConnectionState);
  };

  return pc;
};
