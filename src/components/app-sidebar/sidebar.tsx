import { Calendar, Home, Inbox, LogIn, LogOut, Search, Settings } from "lucide-react";
import { useAppSelector } from "@/store";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Signin",
    url: "/signin",
    icon: LogIn,
  },
  {
    title: "Signup",
    url: "/signup",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const { language } = useAppSelector((state) => state.settings);
  const { i18n, t } = useTranslation();
  // 2. Sync Language with DOM and i18n
  useEffect(() => {
    i18n.changeLanguage(language);
    document.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, i18n]);
  return (
    <Sidebar side={language === "ar" ? "right" : "left"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("alballd")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{t(item.title as string)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
