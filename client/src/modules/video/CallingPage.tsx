import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVideoCall } from "../../context/videoCallContext";
import socketConnection from "../../shared/utils/webRTC/socketConnection";
import VideoMessageBox from "./VideoMessageBox";
import ActionButtons from "./ActionButtons";

interface CallingPageProps {}

const CallingPage: React.FC<CallingPageProps> = () => {
  const remoteFeedEl = useRef<HTMLVideoElement>(null);
  const localFeedEl = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [videoMessage, setVideoMessage] = useState(
    "Please enable video to start!"
  );
  const [offerCreated, setOfferCreated] = useState(false);

  const { localStream, remoteStream, peerConnection, callStatus, userName } =
    useVideoCall();

  useEffect(() => {
    if (!localStream) {
      navigate(`/`);
    } else {
      if (remoteFeedEl.current) {
        remoteFeedEl.current.srcObject = remoteStream;
      }
      if (localFeedEl.current) {
        localFeedEl.current.srcObject = localStream;
      }
    }
  }, [localStream, remoteStream, navigate]);

  useEffect(() => {
    if (peerConnection) {
      peerConnection.ontrack = (e) => {
        if (e?.streams?.length) {
          setVideoMessage("");
        } else {
          setVideoMessage("Disconnected...");
        }
      };
    }
  }, [peerConnection]);

  useEffect(() => {
    const shareVideoAsync = async () => {
      if (!peerConnection) return;
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      const socket = socketConnection(userName);
      socket.emit("newOffer", offer);
      setOfferCreated(true);
      setVideoMessage("Awaiting answer...");
    };

    if (!offerCreated && callStatus.videoEnabled) {
      shareVideoAsync();
    }
  }, [peerConnection, callStatus.videoEnabled, offerCreated, userName]);

  useEffect(() => {
    const addAnswerAsync = async () => {
      if (!peerConnection) return;
      await peerConnection.setRemoteDescription(callStatus.answer);
    };

    if (callStatus.answer) {
      addAnswerAsync();
    }
  }, [peerConnection, callStatus.answer]);

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex justify-between w-full max-w-4xl space-x-5">
        <VideoMessageBox message={videoMessage} />
        <video
          id="local-feed"
          ref={localFeedEl}
          autoPlay
          controls
          playsInline
          className="w-1/2 border-2 border-gray-300 rounded-lg"
        ></video>
        <video
          id="remote-feed"
          ref={remoteFeedEl}
          autoPlay
          controls
          playsInline
          className="w-1/2 border-2 border-gray-300 rounded-lg"
        ></video>
      </div>
      <ActionButtons localFeedEl={localFeedEl} remoteFeedEl={remoteFeedEl} />
    </div>
  );
};

export default CallingPage;
