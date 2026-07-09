import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "Manage your users with a beautiful and intuitive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
