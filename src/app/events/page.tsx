"use client";

import React from 'react';
import Link from 'next/link';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchCalendarGrid from "@/components/stitch/StitchCalendarGrid";
import StitchEventList from "@/components/stitch/StitchEventList";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      
      <main className="pt-16 pb-24 md:pb-8 max-w-[1440px] mx-auto min-h-screen flex flex-col lg:flex-row">
        {/* Calendar Selection Area */}
        <div className="lg:w-[480px] shrink-0 p-6 md:border-r md:border-outline-variant/30 space-y-8">
          <div>
             <h1 className="text-4xl font-black font-headline text-on-surface uppercase tracking-tight mb-2">The <span className="text-secondary">Calendar</span></h1>
             <p className="text-on-surface-variant text-xs opacity-60 uppercase tracking-widest font-bold">Curated experiences across the city</p>
          </div>
          <StitchCalendarGrid />
          
          <div className="hidden lg:block bg-surface-container rounded-2xl p-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">Your Interests</h4>
            <div className="flex flex-wrap gap-2">
               <span className="px-3 py-1 bg-surface-container-lowest border border-outline-variant/10 rounded-full text-[10px] font-bold cursor-pointer hover:border-primary">Music</span>
               <span className="px-3 py-1 bg-surface-container-lowest border border-outline-variant/10 rounded-full text-[10px] font-bold cursor-pointer hover:border-primary">Art</span>
               <span className="px-3 py-1 bg-surface-container-lowest border border-outline-variant/10 rounded-full text-[10px] font-bold cursor-pointer hover:border-primary">Tech</span>
            </div>
          </div>
        </div>

        {/* Event Schedule Area */}
        <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar min-w-0">
          <StitchEventList />
          
          {/* Featured Event Card in List */}
          <Link href="/events/1" className="relative rounded-3xl overflow-hidden aspect-[21/9] flex items-end p-8 group cursor-pointer block">
            <img 
              alt="Featured Event" 
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtSs_tN-TtJSJDEwanA8dWoz4_2sjNdNt66-eRMFy1xjj9X7Xls5g4Z9aGuQ6oTberRDPmAXLGOxq588KsOb8EOet29c45JkUA28kRFizg64PXhdFCcv35QtrPZ_oyfraS9ZS_bz2udImyQc4qUlYh8_CLVYp6G9UpEav-h05nFdShamM9I3niLzEsCH1jKUFfVYT2KJmVT3GzLQTBPjk6JebRrkJlc7VktoTQe_cJS9v4yLopDZiOHri7r07m51ncxjrYl8NXefk"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
            <div className="relative z-10">
              <span className="bg-tertiary text-on-tertiary px-2 py-0.5 rounded text-[8px] font-bold uppercase mb-2 inline-block">Recommended</span>
              <h3 className="text-2xl font-black font-headline text-white mb-1">Makers Market: Autumn Edition</h3>
              <p className="text-white/70 text-sm">Sunday, Nov 2 • Historic Waterfront</p>
            </div>
          </Link>
        </div>
      </main>

      <StitchBottomNav />
    </div>
  );
}
