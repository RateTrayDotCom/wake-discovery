"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOWNS } from '@/constants/mockData';

export default function HighFidelityMunicipalSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-3 py-6 px-6 no-scrollbar overflow-x-auto bg-surface">
      <Link 
        href="/" 
        className={`px-6 py-2 rounded-full border border-outline-variant/30 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
          pathname === "/" 
            ? "bg-primary text-on-primary border-primary shadow-lg" 
            : "hover:bg-primary-container/20 text-on-surface-variant hover:border-primary/50"
        }`}
      >
        All Towns
      </Link>
      {TOWNS.map(town => {
        const townSlug = town.toLowerCase().replace(/ /g, "-");
        const isActive = pathname.includes(`/news/${townSlug}`);
        
        return (
          <Link 
            key={town}
            href={`/news/${townSlug}`}
            className={`px-6 py-2 rounded-full border border-outline-variant/30 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              isActive 
                ? "bg-primary text-on-primary border-primary shadow-lg" 
                : "hover:bg-primary-container/20 text-on-surface-variant hover:border-primary/50"
            }`}
          >
            {town}
          </Link>
        );
      })}
    </div>
  );
}
