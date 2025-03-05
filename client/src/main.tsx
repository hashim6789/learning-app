import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./store";
import { Provider } from "react-redux";
import { VideoCallProvider } from "./context/videoCallContext.tsx";
// import SocketProvider from "./context/socketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <VideoCallProvider>
        {/* <SocketProvider> */}
        <App />
        {/* </SocketProvider> */}
      </VideoCallProvider>
    </Provider>
  </StrictMode>
);
