import DashboardNavbarComponent from "@/components/DashboardNavbarComponent";
import SidebarComponent from "@/components/SidebarComponent";
import ProductTable from "@/components/table/ProductTable";
import React from "react";

export default function page() {
  return (
    <div className="  xl:ml-64 h-screen justify-center items-center">
      <div className=" w-full ">
        <DashboardNavbarComponent />
      </div>
      <div className="w-full">
        <ProductTable />
      </div>
    </div>
  );
}

