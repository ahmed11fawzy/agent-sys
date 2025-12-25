import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/Home/home";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";
import { useEffect } from "react";
import { useAppSelector } from "./store";
import { useTranslation } from "react-i18next";
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
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
