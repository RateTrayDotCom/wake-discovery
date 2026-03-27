"use client";

import React from 'react';
import Link from 'next/link';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";

const CATEGORIES = [
  { name: 'Concerts', icon: 'music_note', count: '45+', color: 'bg-primary' },
  { name: 'Kids', icon: 'child_care', count: '30+', color: 'bg-secondary' },
  { name: 'Food & Drink', icon: 'restaurant', count: '25+', color: 'bg-tertiary' },
  { name: 'Festivals', icon: 'festival', count: '15+', color: 'bg-primary-container' },
  { name: 'Art', icon: 'palette', count: '20+', color: 'bg-secondary-container' },
  { name: 'Outdoor', icon: 'park', count: '50+', color: 'bg-tertiary-container' },
];

export default function CategoryBrowsePage() {
  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      
      <main className="pt-24 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-black font-headline text-on-surface uppercase tracking-tight mb-2">Explore <span className="text-primary text-white bg-primary px-3 py-1 rounded-xl">Wake</span></h1>
        <p className="text-sm font-bold text-on-surface-variant/40 uppercase tracking-widest mb-12">Curated regional discovery by theme</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={`/news/category/${cat.name.toLowerCase().replace(' & ', '-')}`} className="p-8 rounded-[2.5rem] bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer group border border-outline-variant/10 flex items-center justify-between shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[1.5rem] ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-white text-3xl font-black">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="font-black text-2xl text-on-surface uppercase tracking-tighter">{cat.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">{cat.count} Curated Experiences</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary-fixed opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all">north_east</span>
            </Link>
          ))}
        </div>

        <section className="mt-20">
           <h2 className="text-sm font-black font-headline uppercase tracking-[0.4em] text-on-surface-variant/20 mb-10 text-center">Municipality Guides</h2>
           <div className="flex flex-wrap justify-center gap-4">
              {['Raleigh', 'Cary', 'Apex', 'Holly Springs', 'Wake Forest', 'Garner', 'Morrisville', 'Zebulon'].map(town => (
                <Link 
                  key={town} 
                  href={`/news/${town.toLowerCase().replace(' ', '-')}`}
                  className="px-8 py-3 rounded-2xl border-2 border-outline-variant/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                >
                  {town}
                </Link>
              ))}
           </div>
        </section>
      </main>

      <StitchBottomNav />
    </div>
  );
}
