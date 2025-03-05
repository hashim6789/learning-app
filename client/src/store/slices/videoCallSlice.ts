// src/features/videoCall/videoCallSlice.ts
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CallStatus {
  haveMedia: boolean;
  videoEnabled: boolean | null;
  audioEnabled: boolean;
}
interface VideoCallState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
  callStatus: CallStatus;
  connected: boolean;
  userName: string;
  offerData: null;
}

const initialState: VideoCallState = {
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  connected: false,
  callStatus: { haveMedia: false, videoEnabled: false, audioEnabled: false },
  userName: "Hashim",
  offerData: null,
};

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setLocalStream(state, action: PayloadAction<MediaStream>) {
      state.localStream = action.payload;
      console.log(state.localStream, "localStream");
    },
    setRemoteStream(state, action: PayloadAction<MediaStream>) {
      state.remoteStream = action.payload;
    },
    setPeerConnection(state, action: PayloadAction<RTCPeerConnection>) {
      state.peerConnection = action.payload;
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },

    updateCallStatus(state, action: PayloadAction<CallStatus>) {
      state.callStatus = action.payload;
    },

    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },

    setOfferData(state, action: PayloadAction<any>) {
      state.offerData = action.payload;
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setPeerConnection,
  setConnected,
  updateCallStatus,
  setUserName,
  setOfferData,
} = videoCallSlice.actions;

export default videoCallSlice.reducer;
