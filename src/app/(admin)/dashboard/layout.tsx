import DashboardNavbarComponent from "@/components/DashboardNavbarComponent";
import SidebarComponent from "@/components/SidebarComponent";
import { Slide, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <aside className="">
      <SidebarComponent />
      {children}
    </aside>
  );
}
