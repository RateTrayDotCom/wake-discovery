"use client";

import React from 'react';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchCategorySwitcher from "@/components/stitch/StitchCategorySwitcher";
import StitchNewsGrid from "@/components/stitch/StitchNewsGrid";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      
      <main className="pt-16 pb-24 md:pb-8 max-w-[1440px] mx-auto min-h-screen flex flex-col md:flex-row">
        {/* Main Feed Area */}
        <div className="flex-1 md:border-r md:border-outline-variant/30">
          <StitchCategorySwitcher />
          <StitchNewsGrid />
        </div>

        {/* Sidebar Info - Desktop */}
        <aside className="hidden md:block w-[320px] shrink-0 p-6 space-y-8 h-screen sticky top-16 overflow-y-auto no-scrollbar">
          <div className="bg-primary text-on-primary p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-black font-headline mb-4 uppercase tracking-[0.1em]">Pulse Daily</h3>
            <p className="text-xs font-body leading-relaxed opacity-80 mb-6">
              Our investigative newsroom works 24/7 to bring you the stories that shape our town.
            </p>
            <button className="w-full bg-secondary text-on-secondary font-bold py-3 rounded-lg text-sm">
              Support Our Work
            </button>
          </div>
          
          <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/20">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Trending Topics</h4>
            <div className="space-y-3">
              <a className="block text-sm font-bold hover:text-primary transition-colors cursor-pointer">#TransitReform</a>
              <a className="block text-sm font-bold hover:text-primary transition-colors cursor-pointer">#UrbanGardening</a>
              <a className="block text-sm font-bold hover:text-primary transition-colors cursor-pointer">#TechMigration</a>
            </div>
          </div>
        </aside>
      </main>

      <StitchBottomNav />
    </div>
  );
}
