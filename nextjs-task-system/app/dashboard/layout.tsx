import { ThemeModeScript } from "flowbite-react";
import Sidebar from "../../components/Sidebar"; // Importa el componente Sidebar
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MobileNavbar from "@/components/MobileNavbar";
//import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard with Sidebar",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeModeScript />
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <MobileNavbar />
          <Sidebar />
          <div className="flex-1 p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
