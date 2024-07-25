"use client";
import Header from "@/app/components/common/module/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles.css";
import dynamic from "next/dynamic";
import Profile from "@/app/components/common/module/profile";
import Footer from "@/app/components/common/module/footer";
import TemporaryDrawer from "@/app/components/common/module/drawer";

const ReduxProvider = dynamic(() => import("@/redux/redux-provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            <Header />
            <main>
              <TemporaryDrawer />
              {children}
            </main>
          </ReduxProvider>
        </body>
      </html>
  );
}
