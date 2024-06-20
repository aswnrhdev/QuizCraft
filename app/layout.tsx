"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./store";
import { Quiz } from "./@quiz";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = useQuiz(state => state.config);
  let render = config.status ? <Quiz /> : children;

  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
