import React, { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "peerjs";

const VideoCall: React.FC = () => {
  const [peerId, setPeerId] = useState<string>("");
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const peerInstance = useRef<Peer | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer({
      host: "localhost",
      port: 3000,
      path: "/my-peerjs",
      secure: false,
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    });

    peerInstance.current = peer;

    peer.on("open", (id: string) => {
      console.log("My peer ID is:", id);
      setPeerId(id);
    });

    peer.on("call", (call: MediaConnection) => {
      console.log("Incoming call from", call.peer);

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream); // Answer the call with local stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }

          call.on("stream", (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        })
        .catch((error) => {
          console.error("Failed to access media devices:", error);
        });
    });

    return () => peer.destroy(); // Clean up the Peer instance on unmount
  }, []);

  const callPeer = () => {
    if (!remotePeerId || !peerInstance.current) {
      console.warn("Remote Peer ID or Peer instance is missing.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = peerInstance.current!.call(remotePeerId, stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        call.on("stream", (remoteStream: MediaStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });

        call.on("error", (error) => {
          console.error("Call error:", error);
        });
      })
      .catch((error) => {
        console.error("Failed to access media devices:", error);
      });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col items-center">
        <p>Your Peer ID: {peerId}</p>
        <input
          type="text"
          placeholder="Enter remote peer ID"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          onClick={callPeer}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Call
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <video
          ref={videoRef}
          className="w-full border border-gray-300"
          playsInline
          muted // Muted to prevent echo during testing
        />
        <video
          ref={remoteVideoRef}
          className="w-full border border-gray-300"
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoCall;
