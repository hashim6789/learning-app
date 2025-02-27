// src/features/videoCall/videoCallSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoCallState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
  connected: boolean;
}

const initialState: VideoCallState = {
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  connected: false,
};

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setLocalStream(state, action: PayloadAction<MediaStream>) {
      state.localStream = action.payload;
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
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setPeerConnection,
  setConnected,
} = videoCallSlice.actions;

export default videoCallSlice.reducer;
