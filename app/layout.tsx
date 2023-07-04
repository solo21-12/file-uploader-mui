import ResponsiveAppBar from "@/components/navbar";
import "./globals.css";
import "../style/home.css";
import "../style/appBar.css";
import "../style/auth.css";
import "../style/dashboard.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./Context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "File uploader",
  description: "created by Dawit using mui library",
};

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
        <AuthProvider>
          <ResponsiveAppBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
