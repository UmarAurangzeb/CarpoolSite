import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import GoogleAnalytics from "./components/GoogleAnalytics";
export const metadata: Metadata = {
  title: "Fast Carpool",
  description: "carpool website for fast nuces karachi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-950">
      <GoogleAnalytics />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
