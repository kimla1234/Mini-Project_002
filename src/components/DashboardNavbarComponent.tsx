"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DashboardNavbarComponent() {
  const router = useRouter();
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div>
        <div className="flex items-center  justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-5">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <input
              className="mx-4 w-full border rounded-md px-4 py-2"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center ">
            <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              Logout Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
