import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

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
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NS1QVR2CXT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NS1QVR2CXT');
            `,
          }}
        />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
