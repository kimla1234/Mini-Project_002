import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import Loading from "./loading";
import NavbarComponent from "@/components/NavbarComponent";
import LoadingComponent from "@/components/LoadingComponent";
import FooterComponent from "@/components/FooterComponent";



const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
	title: "Online Shopping",
	description: "Shop the latest products online.",
  openGraph: {
		title: "Online ecommerce website",
		description:
			"Shop the latest products online.",
		type: "website",
		locale: "en_US",
		url: "https://khstore.sen-quiz.tech",
		emails: "yithsopheaktra18@gmail.com",
		phoneNumbers: "+855 96 717 4832",
		siteName: "KhStore",
		countryName: "Cambodia",
		images: "https://store.istad.co/media/icon_images/ecommerce.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<link rel="icon" href="/icons/icons.png" sizes="2" />
        <NavbarComponent/>
				<Suspense fallback={<Loading />}>{children}</Suspense>
        <FooterComponent/>
			</body>
		</html>
	);
}