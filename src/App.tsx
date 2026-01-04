import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/Home/home";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";
import { useEffect } from "react";
import { useAppSelector } from "./store";
import { useTranslation } from "react-i18next";
import Agents from "./pages/Agents/agent";
import NewAgent from "./pages/Agents/new-agent";
import Stores from "./pages/Stores/Stores";
import { ProtectedRoute } from "./components/protected-route";
import MyDashboard from "./pages/agent-dashboard/my-dashboard";

function App() {
  const { theme, language } = useAppSelector((state) => state.settings);
  const { i18n } = useTranslation();

  // 1. Sync Theme with DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // 2. Sync Language with DOM and i18n
  useEffect(() => {
    i18n.changeLanguage(language);
    document.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, i18n]);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Shared routes (both agent and team_manager) */}
            <Route path="/" element={<Home />} />

            {/* Team Manager only routes */}
            <Route element={<ProtectedRoute allowedRoles={["team_manager"]} />}>
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/new-agent" element={<NewAgent />} />
              {<Route path="/stores" element={<Stores />} />}
              {/* <Route path="/commissions" element={<Commissions />} /> */}
              {/* <Route path="/reports" element={<Reports />} /> */}
              {/* <Route path="/settings" element={<Settings />} /> */}
            </Route>

            {/* Agent only routes */}
            <Route element={<ProtectedRoute allowedRoles={["sales_agent"]} />}>
              {<Route path="/my-dashboard" element={<MyDashboard />} />}
              {/* <Route path="/daily-visits" element={<DailyVisits />} /> */}
              {/* <Route path="/my-wallet" element={<MyWallet />} /> */}
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
