import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./views/auth";
import Chat from "./views/chat";
import User from "./views/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
