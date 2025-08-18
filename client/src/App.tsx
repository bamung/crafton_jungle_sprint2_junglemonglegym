// client/src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./store/auth";
import Protected from "./components/Protected";

// 페이지
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPage from "./pages/ForgotPage";
import ResetPage from "./pages/ResetPage";

export default function App() {
  const hydrate = useAuth((s) => s.hydrateFromStorage);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <MainPage />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/reset" element={<ResetPage />} />
      </Routes>
    </BrowserRouter>
  );
}
