"use client";
import React, { useState } from "react";
import ProductTable from "./table/ProductTable";
import { HiOutlineLogout } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";

const SidebarComponent: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className={`flex  h-screen bg-gray-200 `}>
      {/* sidebar */}
      <div
        className={`h-screen md:flex  flex-col w-64 bg-gray-800 ${
          showSidebar
            ? "xl:h-screen  md:h-screen h-screen  "
            : "xl:hidden md:hidden hidden"
        }`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Sidebar</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <a
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            >
              <MdDashboard className="h-6 w-6 mr-2" />

              Dashboard
            </a>
            <a
              href="/dashboard/create-product"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <MdOutlinePostAdd className="h-6 w-6 mr-2" />
              Add Product
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Settings
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex xl:fixed  md:w-full w-[85%] flex-col  flex-1 overflow-x-auto ${
          showSidebar ? " xl:ml-64 xl:w-[85%]  w-[100%]  " : ""
        }`}
      >
        <div className="flex items-center justify-between p-1 h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center pr-4">
            <a href="/">
              <button className="bg-red-600 xl:p-1.5 p-1 rounded-md flex items-center  text-white hover:text-gray-200 focus:outline-none focus:text-gray-700">
                Logout
                <HiOutlineLogout className="h-6 w-6 ml-3" />
              </button>
            </a>
          </div>
        </div>
        <div className="p-2 mr-3 ml-3  mb-10 mt-2 ">
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
