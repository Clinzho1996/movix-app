// pages/_app.js

import "./globals.css"; // Import your global CSS file
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import dotenv from "dotenv";
dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movix App | Dev-Clinton",
  description: "Developed by Emonena Confidence",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </>
  );
}
