"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import DashboardNavbarComponent from "./DashboardNavbarComponent";

const SidebarComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`md:flex h-screen  fixed flex-col w-64 bg-gray-800 ${
        isSidebarOpen ? "" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">Sidebar</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          <a
            href="/dashboard/create-product"
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Messages
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
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Settings
          </a>
        </nav>
        
      </div>
      
    </div>
  );
};

export default SidebarComponent;
