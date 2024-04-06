"use client";

import { Footer } from "flowbite-react";
import { usePathname } from "next/navigation";

export default function FooterComponent() {

  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/dashboard") {
    return null;
  }

  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            src="/logo.jpg"
            alt="Flowbite Logo"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Online Shopping™" year={2024} />
      </div>
    </Footer>
  );
}
