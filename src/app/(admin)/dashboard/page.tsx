import DashboardNavbarComponent from "@/components/DashboardNavbarComponent";
import SidebarComponent from "@/components/SidebarComponent";
import ProductTable from "@/components/table/ProductTable";
import React from "react";



export default function page() {
  return (
    <div className="w-full h-screen justify-center items-center">
        <SidebarComponent />
    </div>
  );
}

