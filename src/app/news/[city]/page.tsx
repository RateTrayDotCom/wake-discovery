"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchCategorySwitcher from "@/components/stitch/StitchCategorySwitcher";
import StitchNewsGrid from "@/components/stitch/StitchNewsGrid";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";
import StitchCityBreakouts from "@/components/stitch/StitchCityBreakouts";
import StitchCalendarGrid from "@/components/stitch/StitchCalendarGrid";
import StitchRealMap from "@/components/stitch/StitchRealMap";
import { useUserPreferences } from "@/components/context/UserPreferencesContext";
import { motion } from "framer-motion";

export default function CityNewsPage() {
  const params = useParams();
  const { toggleFollowTown, isFollowing } = useUserPreferences();
  const city = Array.isArray(params?.city) ? params.city[0] : params?.city;
  const decodedCity = city ? decodeURIComponent(city).replace(/-/g, ' ') : '';
  const cityName = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);

  const following = isFollowing(cityName);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface"
    >
      <StitchHeader />
      
      <main className="pt-16 pb-24 md:pb-8 max-w-[1440px] mx-auto min-h-screen">
        <div className="px-6 py-8 border-b border-outline-variant/30 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h1 className="text-4xl font-black font-headline text-on-surface uppercase tracking-tight">
                {cityName} <span className="text-primary tracking-[0.2em] font-light ml-2">Activities</span>
              </h1>
              <p className="text-on-surface-variant text-sm mt-2 opacity-60 font-body uppercase tracking-[0.2em]">The best things to do, see, and eat in {cityName}</p>
           </div>
           
            <div className="flex items-center gap-3">
              {following && (
                <span className="hidden sm:inline-block px-3 py-1 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded-full animate-fade-in">
                  Priority Discovery Active
                </span>
              )}
              <button 
                onClick={() => toggleFollowTown(cityName)}
                className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 ${
                  following 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-primary/5 hover:text-primary border border-outline-variant/30"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{following ? 'check_circle' : 'add_circle'}</span>
                {following ? 'Following Town' : 'Follow Town'}
              </button>
            </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 md:border-r md:border-outline-variant/30 min-w-0">
            {/* Thematic Breakouts */}
            <StitchCityBreakouts city={cityName} />
            
            <div className="mt-12 mb-20">
              <div className="px-6 mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-on-surface-variant/40">Latest News in {cityName}</h3>
              </div>
              <StitchNewsGrid town={cityName} />
            </div>
          </div>
          
          <aside className="hidden md:block w-[400px] shrink-0 p-0 h-screen sticky top-16 overflow-y-auto no-scrollbar">
             <div className="p-8 space-y-12">
                <StitchCalendarGrid city={cityName} />

                <div className="bg-surface-container rounded-[2rem] p-6 border border-outline-variant/10">
                   <h3 className="text-sm font-black uppercase tracking-widest text-on-surface-variant mb-6">{cityName} Atlas</h3>
                   <StitchRealMap city={cityName} />
                </div>
                
                <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Discovery Insider</h4>
                  <p className="text-sm font-bold text-on-surface leading-snug mb-4">Get the definitive weekly guide for {cityName} delivered every Thursday.</p>
                  <button className="w-full py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Join In</button>
                </div>
             </div>
          </aside>
        </div>
      </main>

      <StitchBottomNav />
    </motion.div>
  );
}
