import React from "react";
import Products from "../components/Products";
import Nav from "../components/Nav";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const page = () => {
  return (
    <div className="bg-main min-h-[100dvh] center">
      <Nav />
      {/* <SidebarProvider> */}
      {/* <AppSidebar /> */}
      {/* <SidebarTrigger className="z-50" /> */}
      <Products />
      {/* </SidebarProvider> */}
    </div>
  );
};

export default page;
