"use client";

import React from 'react';
import Link from 'next/link';
import StitchSidebar from './StitchSidebar';
import { useUserPreferences } from '@/components/context/UserPreferencesContext';

export default function StitchHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { preferences, setKidFriendlyOnly } = useUserPreferences();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-50 dark:bg-slate-900 flex items-center justify-between px-6 h-16 w-full border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors active:scale-95 duration-100 p-2 rounded-lg"
          >
            <span className="material-symbols-outlined text-slate-900 dark:text-slate-50">menu</span>
          </button>
          <Link href="/" className="text-xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-widest font-headline cursor-pointer">Wake Discovery</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setKidFriendlyOnly(!preferences.kidFriendlyOnly)}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-all border font-black text-[10px] uppercase tracking-widest ${
              preferences.kidFriendlyOnly 
                ? "bg-primary text-white border-primary shadow-lg scale-105" 
                : "bg-surface-container text-on-surface-variant/40 border-outline-variant/30 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-sm text-inherit">child_care</span>
            Parent Mode
          </button>

          <div className="flex items-center gap-2">
            <Link href="/map" className="hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors active:scale-95 duration-100 p-2 rounded-lg">
              <span className="material-symbols-outlined text-slate-900 dark:text-slate-50">map</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/30 hidden sm:block shadow-inner">
              <img 
                alt="User profile" 
                src="/images/avatar.png" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <StitchSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
