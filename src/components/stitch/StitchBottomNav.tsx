"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StitchBottomNav() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { name: 'Home', icon: 'home', href: '/' },
    { name: 'Map', icon: 'map', href: '/map' },
    { name: 'Events', icon: 'event', href: '/events' },
    { name: 'Saved', icon: 'bookmark', href: '/categories' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-slate-100 dark:border-slate-800 flex justify-around items-center h-20 px-4 pb-2 w-full md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all ${
              isActive 
                ? 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30' 
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>{item.icon === 'events' ? 'event' : item.icon}</span>
            <span className="font-body text-[11px] font-semibold uppercase tracking-wider mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
