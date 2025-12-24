import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/sidebar";
import { useEffect } from "react";
import { useAppSelector } from "./store";
import { useTranslation } from "react-i18next";
import ToolBar from "./components/tool-bar/toolbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
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
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col">
        <ToolBar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
