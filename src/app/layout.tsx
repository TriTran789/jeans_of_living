"use client";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Providers } from "./Provider";
import Heading from "@/utils/Heading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Roboto-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi-VN" suppressHydrationWarning>
      <body className={`${poppins.variable} ${robotoMono.variable} relative`}>
        <Heading title="JOL" description="" keywords="" />
        <Providers>
          <Header />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
