"use client";

import React from 'react';
import Link from 'next/link';
import { TOWNS } from '@/constants/mockData';

interface StitchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StitchSidebar({ isOpen, onClose }: StitchSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[320px] bg-slate-50 dark:bg-slate-900 z-[70] shadow-2xl transition-transform duration-500 ease-out border-r border-outline-variant/30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pt-20 pb-10 px-6">
          
          {/* Main Navigation */}
          <nav className="space-y-4 mb-10">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-2">Main Menu</h4>
            <Link href="/" onClick={onClose} className="flex items-center gap-4 group">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">home</span>
              <span className="text-lg font-black font-headline uppercase text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">Home</span>
            </Link>
            <Link href="/events" onClick={onClose} className="flex items-center gap-4 group">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">event</span>
              <span className="text-lg font-black font-headline uppercase text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">Events</span>
            </Link>
            <Link href="/news/category/concerts" onClick={onClose} className="flex items-center gap-4 group">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">music_note</span>
              <span className="text-lg font-black font-headline uppercase text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">Concerts</span>
            </Link>
            <Link href="/news/category/kids" onClick={onClose} className="flex items-center gap-4 group">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">child_care</span>
              <span className="text-lg font-black font-headline uppercase text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">Kids</span>
            </Link>
            <Link href="/news/category/food-drink" onClick={onClose} className="flex items-center gap-4 group">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">restaurant</span>
              <span className="text-lg font-black font-headline uppercase text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">Food/Drink</span>
            </Link>
          </nav>

          {/* City Exploration Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-2">Explore Towns</h4>
            <div className="grid grid-cols-1 gap-1">
              {TOWNS.map((town) => {
                const townSlug = town.toLowerCase().replace(/ /g, "-");
                return (
                  <Link 
                    key={town} 
                    href={`/news/${townSlug}`} 
                    onClick={onClose}
                    className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 group transition-all"
                  >
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary">{town}</span>
                    <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">arrow_forward_ios</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-outline-variant/10 text-[10px] text-on-surface-variant/50 font-bold uppercase tracking-widest">
            © 2026 Wake County Activities Guide
          </div>
        </div>

        {/* Close Button inside Sidebar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface-variant">close</span>
        </button>
      </aside>
    </>
  );
}
