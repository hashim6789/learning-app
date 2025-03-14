import { CallStatus } from "../../../context/videoCallContext";

const prepForCall = (
  callStatus: CallStatus,
  updateCallStatus: (status: CallStatus) => void,
  setLocalStream: (stream: MediaStream) => void
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    // can bring constraints in as a param
    const constraints = {
      video: true, // must have one constraint, don't have to show it yet
      audio: false,
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // update bools
      const copyCallStatus = { ...callStatus };
      copyCallStatus.haveMedia = true; // signals to the app that we have media
      copyCallStatus.videoEnabled = null; // init both to false, you can init to true
      copyCallStatus.audioEnabled = false;
      updateCallStatus(copyCallStatus);
      setLocalStream(stream);
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export default prepForCall;
