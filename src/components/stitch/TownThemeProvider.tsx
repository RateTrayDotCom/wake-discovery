"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type TownTheme = {
  primary: string;
  secondary: string;
  container: string;
};

const TOWN_THEMES: Record<string, TownTheme> = {
  "apex": { primary: "#800000", secondary: "#D4AF37", container: "#fff5f5" },
  "raleigh": { primary: "#E22126", secondary: "#2C2C2C", container: "#fffafa" },
  "cary": { primary: "#00563F", secondary: "#FFD200", container: "#f0fdf4" },
  "holly-springs": { primary: "#2B3D6B", secondary: "#77B5E0", container: "#f0f9ff" },
  "wake-forest": { primary: "#C1A33E", secondary: "#1B1B1B", container: "#fdfbea" },
  "morrisville": { primary: "#003366", secondary: "#E31837", container: "#f0f7ff" },
  "garner": { primary: "#1d4ed8", secondary: "#f59e0b", container: "#f0f4ff" },
};

export const TownThemeContext = createContext<{ currentTown: string | null }>({ currentTown: null });

export default function TownThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentTown, setCurrentTown] = useState<string | null>(null);

  useEffect(() => {
    // Detect town from pathname e.g., /news/apex or /news/raleigh
    const match = pathname.match(/\/news\/([^\/]+)/);
    const town = match ? match[1] : null;

    setCurrentTown(town);

    if (town) {
      document.documentElement.setAttribute('data-town', town);
    } else {
      document.documentElement.removeAttribute('data-town');
    }
  }, [pathname]);

  return (
    <TownThemeContext.Provider value={{ currentTown }}>
      {children}
    </TownThemeContext.Provider>
  );
}

export const useTownTheme = () => useContext(TownThemeContext);
