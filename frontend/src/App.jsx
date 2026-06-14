import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignInPage from "./pages/auth/signin.jsx";
import SignUpPage from "./pages/auth/signup.jsx";
import "./index.css";
import EmailSentPage from "./pages/auth/emailSentPage.jsx";
import Dashboard from "./pages/user/dashboard.jsx";
import ForgotPasswordPage from "./pages/auth/forgotpassword.jsx";
import ResetPasswordPage from "./pages/auth/resetpassword.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/email-sent" element={<EmailSentPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password/" element={<ResetPasswordPage/>} />
      </Routes>``
    </Router>
  )
}

export default App
