import {
  Calendar,
  Home,
  Inbox,
  LogIn,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import { useAppSelector } from "@/store";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

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
    title: "Sign In",
    url: "/signin",
    icon: LogIn,
  },
  {
    title: "Sign Up",
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
    <Sidebar
      side={language === "ar" ? "right" : "left"}
      className="p-4 border-0"
    >
      <SidebarHeader className="  ">
        <div className="flex items-center gap-2  ">
          <div className=" ">
            <img
              className="w-16 h-16 object-fill "
              src="https://res.cloudinary.com/doxyvufkz/image/upload/v1766599799/logo192_bzai2h.png"
              alt={t("alballd")}
            />
          </div>
          <h2 className="text-xl font-semibold leading-12 text-(--primary-300)  h-16">
            {t("alballd")}
          </h2>
        </div>
      </SidebarHeader>
      <Separator className=" w-3/4 mx-auto shadow-sm" />
      <SidebarContent className="rounded-lg border-0 ">
        <SidebarGroup className="border-0 rounded-lg">
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
