import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wake County Pulse",
  description: "High-density local news and events for Wake County municipalites.",
};

import TownThemeProvider from "@/components/stitch/TownThemeProvider";
import { UserPreferencesProvider } from "@/components/context/UserPreferencesContext";
import StitchFooter from "@/components/stitch/StitchFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${workSans.variable} font-body antialiased text-on-surface bg-surface text-slate-900`}>
        <UserPreferencesProvider>
          <TownThemeProvider>
            {children}
            <StitchFooter />
          </TownThemeProvider>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
