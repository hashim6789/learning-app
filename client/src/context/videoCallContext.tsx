import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { getUserProperty } from "../shared/utils/user.util";

export interface CallStatus {
  haveMedia: boolean;
  videoEnabled: boolean | null;
  audioEnabled: boolean;
  answer: any;
  audio: "off" | "on" | "enabled";
  video: "off" | "on" | "enabled";
  current: "complete";
  myRole: any;
}

interface VideoCallState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
  callStatus: CallStatus;
  connected: boolean;
  userName: string;
  offerData: any;
}

interface VideoCallContextType extends VideoCallState {
  setLocalStream: (stream: MediaStream) => void;
  setRemoteStream: (stream: MediaStream) => void;
  setPeerConnection: (connection: RTCPeerConnection) => void;
  updateCallStatus: (status: CallStatus) => void;
  setConnected: (connected: boolean) => void;
  setUserName: (name: string) => void;
  setOfferData: (data: any) => void;
}

interface VideoCallProviderProps {
  children: ReactNode;
}

const VideoCallContext = createContext<VideoCallContextType | undefined>(
  undefined
);

export const VideoCallProvider: React.FC<VideoCallProviderProps> = ({
  children,
}) => {
  const [localStream, setLocalStreamState] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStreamState] = useState<MediaStream | null>(
    null
  );
  const [peerConnection, setPeerConnectionState] =
    useState<RTCPeerConnection | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>({
    haveMedia: false,
    videoEnabled: false,
    audioEnabled: false,
    answer: null,
    audio: "off",
    video: "off",
    current: "complete",
    myRole: null,
  });
  const [connected, setConnectedState] = useState<boolean>(false);
  const [userName, setUserNameState] = useState<string>(
    getUserProperty("firstName") as string
  );
  const [offerData, setOfferDataState] = useState<any>(null);

  const setLocalStream = useCallback((stream: MediaStream) => {
    setLocalStreamState(stream);
    console.log("settled local stream", localStream);
  }, []);

  const setRemoteStream = useCallback((stream: MediaStream) => {
    setRemoteStreamState(stream);
    console.log("settled remote stream", remoteStream);
  }, []);

  const setPeerConnection = useCallback((connection: RTCPeerConnection) => {
    setPeerConnectionState(connection);
    console.log("settled peerConnection", peerConnection);
  }, []);

  const updateCallStatus = useCallback((status: CallStatus) => {
    setCallStatus(status);
    console.log("settled status", status);
  }, []);

  const setConnected = useCallback((connected: boolean) => {
    setConnectedState(connected);
    console.log("settled connected", connected);
  }, []);

  const setUserName = useCallback((name: string) => {
    setUserNameState(name);
    console.log("settled name", name);
  }, []);

  const setOfferData = useCallback((data: any) => {
    setOfferDataState(data);
    console.log("settled data", data);
  }, []);

  return (
    <VideoCallContext.Provider
      value={{
        localStream,
        setLocalStream,
        remoteStream,
        setRemoteStream,
        peerConnection,
        setPeerConnection,
        callStatus,
        updateCallStatus,
        connected,
        setConnected,
        userName,
        setUserName,
        offerData,
        setOfferData,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};

export const useVideoCall = (): VideoCallContextType => {
  const context = useContext(VideoCallContext);
  if (!context) {
    throw new Error("useVideoCall must be used within a VideoCallProvider");
  }
  return context;
};
