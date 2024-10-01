import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ApplicationLayout from "./application-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collab Inn",
  description: "Home of Collabs.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={inter.className}>
        <ApplicationLayout>{children}</ApplicationLayout>
      </body>
    </html>
  )
}

