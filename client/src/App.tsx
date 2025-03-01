// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
// import MainRoutes from "./router/MainRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { SocketProvider } from "./context/socketContext";

function App() {
  return (
    <GoogleOAuthProvider clientId="928386759524-9tflikf8cdtpuiavjnq3a65lm0sgjf55.apps.googleusercontent.com">
      {/* <SocketProvider> */}
      <ToastContainer />
      <Router>
        <AppRoutes />
        {/* <MainRoutes /> */}
      </Router>
      {/* </SocketProvider> */}
    </GoogleOAuthProvider>
  );
}

export default App;
