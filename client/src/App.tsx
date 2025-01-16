// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <GoogleOAuthProvider clientId="928386759524-9tflikf8cdtpuiavjnq3a65lm0sgjf55.apps.googleusercontent.com">
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
