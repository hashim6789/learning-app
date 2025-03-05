import React, { RefObject } from "react";
import { useVideoCall } from "../../context/videoCallContext";

interface AudioButtonProps {
  localFeedEl: RefObject<HTMLVideoElement>;
}

const AudioButton: React.FC<AudioButtonProps> = ({ localFeedEl }) => {
  const { callStatus, localStream, peerConnection, updateCallStatus } =
    useVideoCall();
  let micText;
  if (callStatus.audio === "off") {
    micText = "Join Audio";
  } else if (callStatus.audio === "enabled") {
    micText = "Mute";
  } else {
    micText = "Unmute";
  }

  const startStopAudio = () => {
    if (!localStream || !peerConnection) return;
    const copyCallStatus = { ...callStatus };
    if (callStatus.audioEnabled === true) {
      copyCallStatus.audioEnabled = false;
      updateCallStatus(copyCallStatus);
      const tracks = localStream.getAudioTracks();
      tracks.forEach((t) => (t.enabled = false));
    } else if (callStatus.audioEnabled === false) {
      copyCallStatus.audioEnabled = true;
      updateCallStatus(copyCallStatus);
      const tracks = localStream.getAudioTracks();
      tracks.forEach((t) => (t.enabled = true));
    } else {
      localStream.getAudioTracks().forEach((t) => {
        peerConnection.addTrack(t, localStream);
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={startStopAudio}
      >
        <i
          className={`fa ${
            callStatus.audio === "enabled"
              ? "fa-microphone-slash"
              : "fa-microphone"
          }`}
        ></i>
      </button>
      <div className="mt-2 text-sm text-white">{micText}</div>
    </div>
  );
};

export default AudioButton;
