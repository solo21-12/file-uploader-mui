"use client"

import ResponsiveAppBar from "@/component/navbar";
import "./globals.css";
import "../style/home.css";
import "../style/appBar.css";
import "../style/auth.css";
import "../style/dashboard.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "File uploader",
//   description: "created by Dawit using mui library",
// };

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ResponsiveAppBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
