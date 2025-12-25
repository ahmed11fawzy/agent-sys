import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/sidebar";
import ToolBar from "./components/tool-bar/toolbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
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
