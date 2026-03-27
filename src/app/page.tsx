"use client";

import React from 'react';
import Link from 'next/link';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchHero from "@/components/stitch/StitchHero";
import StitchConcertScroll from "@/components/stitch/StitchConcertScroll";
import StitchDiscoverFeed from "@/components/stitch/StitchDiscoverFeed";
import StitchEventList from "@/components/stitch/StitchEventList";
import StitchNewsletter from "@/components/stitch/StitchNewsletter";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";
import StitchDailyPulse from "@/components/stitch/StitchDailyPulse";
import StitchRealMap from "@/components/stitch/StitchRealMap";
import StitchFooter from "@/components/stitch/StitchFooter";
import StitchCalendarGrid from "@/components/stitch/StitchCalendarGrid";
import HomeFeaturedSection from "@/components/stitch/HomeFeaturedSection";
import StitchBlogSnippet from "@/components/stitch/StitchBlogSnippet";
import { useUserPreferences } from "@/components/context/UserPreferencesContext";

import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';

export default function HomeHubPage() {
  const [heroEvent, setHeroEvent] = React.useState<WakeEvent | null>(null);

  React.useEffect(() => {
    const loadHero = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'), limit(5));
        const snap = await getDocs(q);
        const events = snap.docs.map(d => ({ id: d.id, ...d.data() })) as WakeEvent[];
        if (events.length > 0) {
          setHeroEvent(events[Math.floor(Math.random() * events.length)]);
        }
      } catch (e) {
        console.error("Hero load error:", e);
      }
    };
    loadHero();
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      
      <main className="max-w-[1440px] mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 md:border-r md:border-outline-variant/30 min-w-0">
            <StitchHero event={heroEvent} />
            
            <div className="mt-16">
              <div className="px-6 mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-black font-headline tracking-tighter text-on-surface uppercase">Live Experiences</h2>
                  <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mt-2">The County's Essential Performance Pulse</p>
                </div>
                <Link href="/news/category/concerts" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline cursor-pointer">View All &rarr;</Link>
              </div>
              <StitchConcertScroll />
            </div>

            <HomeFeaturedSection 
              category="kids" 
              title="Parent Discovery" 
              color="bg-secondary" 
            />

            <HomeFeaturedSection 
              category="food-drink" 
              title="Culinary Pulse" 
              color="bg-tertiary" 
            />

            <StitchBlogSnippet />

            {/* Extra Section: Weekend Preview */}
            <section className="px-6 py-20 bg-primary/5 border-t border-primary/10">
               <div className="max-w-2xl">
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">Editorial</span>
                  <h2 className="text-4xl font-black font-headline text-on-surface mt-4 mb-6 leading-tight">Your Weekend Guide is Brewing</h2>
                  <p className="text-lg text-on-surface-variant mb-8 leading-relaxed opacity-80">Our AI editorial engine is currently analyzing thousands of data points to bring you the definitive guide for this coming Friday through Sunday. Join the digest to be the first to know.</p>
                  <button className="bg-primary text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">Notify Me</button>
               </div>
            </section>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-[420px] shrink-0 p-0 h-screen sticky top-16 overflow-y-auto no-scrollbar">
             <div className="p-8 space-y-12">
                <StitchCalendarGrid />

                <StitchEventList />

                <div className="bg-surface-container rounded-[2rem] p-6 border border-outline-variant/10">
                   <h3 className="text-sm font-black uppercase tracking-widest text-on-surface-variant mb-6">Regional Atlas</h3>
                   <StitchRealMap />
                </div>
                
                <StitchDiscoverFeed sidebar={true} />
                
                <StitchNewsletter />
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
