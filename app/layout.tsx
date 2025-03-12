import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3D Email Capture",
  description: "A landing page with a 3D cube, email capture form, and a dark mode toggle.",
};

export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
