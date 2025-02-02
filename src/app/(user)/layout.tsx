// app/layout.tsx ya layout.js
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
