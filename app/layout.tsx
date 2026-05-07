import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jeremy Robertson — DevOps Engineer & Software Architect",
  description: "Portfolio of Jeremy Robertson — DevOps Engineer, Software Architect, and full-stack developer with experience scaling systems to millions of users.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
