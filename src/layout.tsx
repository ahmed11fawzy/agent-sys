import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/sidebar";
import ToolBar from "./components/tool-bar/toolbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <SidebarProvider className="p-4 pe-8 relative rounded-lg border-0">
      <AppSidebar />
      <main className="flex w-full flex-col  ">
        <ToolBar />
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
