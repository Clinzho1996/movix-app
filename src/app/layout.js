// pages/_app.js
import "./globals.css"; // Import your global CSS file
import { Inter } from "next/font/google";
import dotenv from "dotenv";
import { SessionProvider } from "next-auth/react";
import Provider from "@/components/Provider";
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
          <Provider>{children}</Provider>
        </body>
      </html>
    </>
  );
}
