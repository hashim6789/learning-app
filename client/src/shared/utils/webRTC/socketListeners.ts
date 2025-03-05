import { Socket } from "socket.io-client";
import { CallStatus } from "../../../context/videoCallContext";

const clientSocketListeners = (
  socket: Socket,
  typeOfCall: any,
  callStatus: CallStatus,
  updateCallStatus: (status: CallStatus) => void,
  peerConnection: RTCPeerConnection
) => {
  socket.on("answerResponse", (entireOfferObj) => {
    console.log(entireOfferObj);
    const copyCallStatus = { ...callStatus };
    copyCallStatus.answer = entireOfferObj.answer;
    copyCallStatus.myRole = typeOfCall;
    updateCallStatus(copyCallStatus);
  });

  socket.on("receivedIceCandidateFromServer", (iceC) => {
    if (iceC) {
      peerConnection.addIceCandidate(iceC).catch((err) => {
        console.log("Chrome thinks there is an error. There isn't...");
      });
      console.log(iceC);
      console.log("Added an iceCandidate to existing page presence");
      // setShowCallInfo(false);
    }
  });
};

export default clientSocketListeners;
