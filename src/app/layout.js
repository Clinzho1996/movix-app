// pages/_app.js

import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata = {
  title: "Movix App | Dev-Clinton",
  description: "Developed by Emonena Confidence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
