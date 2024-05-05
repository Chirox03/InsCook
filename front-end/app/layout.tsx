'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`relative overflow-hidden h-screen grid grid-cols-1 sm:grid-cols-7 overflow-y-auto auto-cols-max w-screen overflow-x-scroll ${inter.className}`}>
        
        <div className="sm:col-start-3 sm:col-end-6 h-full">
    <AuthProvider>
          {children}
    </AuthProvider>
         
          </div>
        </body>
    </html>
  );
}
