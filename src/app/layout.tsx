import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refactory",
  description: "Write better code with AI assistance",
};

export type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full">{children}</body>
    </html>
  );
}