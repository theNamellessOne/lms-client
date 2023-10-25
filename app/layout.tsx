import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { Navbar } from "@/components/layout/navbar/navbar";
import { AuthProvider } from "@/providers/auth-provider";

const poppins = Poppins({ weight: ["500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS",
  description: "LMS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
          >
            <div
              className={
                "hidden shadow-sm lg:block fixed z-50 inset-y-0 h-screen w-64"
              }
            >
              <Sidebar />
            </div>
            <main className={"lg:pl-64"}>
              <Navbar />
              <Toaster position={"bottom-left"} />
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
