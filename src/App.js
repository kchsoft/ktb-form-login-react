import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, // 새로고침 없이 페이지 이동하게 도와줌.
} from "react-router-dom";
import Home from "./routers/Home";
import LoginQuiz from "./routers/LoginQuiz";
import SignupForm from "./routers/SignupForm";
import Chat from "./routers/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginQuiz" element={<LoginQuiz />} />
        <Route path="/signupForm" element={<SignupForm />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
