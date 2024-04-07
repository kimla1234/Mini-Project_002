import SidebarComponent from "@/components/SidebarComponent";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <aside className="flex h-screen">
      {children}
    </aside>
  );
}
