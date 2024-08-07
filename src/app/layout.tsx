import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import GoogleAnalytics from "./Nextcomponents/GoogleAnalytics";
export const metadata: Metadata = {
  title: "Fast Carpool",
  description: "carpool website for fast nuces karachi",
};
import Navbar from "./Nextcomponents/Nav/Navbar";
import ThemeProvider from '../app/Nextcomponents/ThemeProvider';
import Footer from "./Nextcomponents/Footer";
import Provider from "./SessionProvider/Session";
import { authOptions } from './api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Provider session={session}>
        <GoogleAnalytics />
        <body className={`${inter.className}`}>
          <div className="relative min-h-[100vh] flex flex-col">
            <ThemeProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </div>
        </body>
      </Provider>
    </html>
  );
}
