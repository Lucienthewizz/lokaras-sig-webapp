import { BrowserRouter, Routes, Route } from "react-router-dom";

import SessionExpiredNotifier from "./components/auth/SessionExpiredNotifier";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Component utama untuk mengatur routing halaman aplikasi
function App() {
  return (
    <BrowserRouter>
      <SessionExpiredNotifier />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
