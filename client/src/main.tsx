import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./store";
import { Provider } from "react-redux";
// import SocketProvider from "./context/socketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <SocketProvider> */}
      <App />
      {/* </SocketProvider> */}
    </Provider>
  </StrictMode>
);
