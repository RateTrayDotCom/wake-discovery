"use client";

import React from 'react';
import Link from 'next/link';
import { WakeEvent } from '@/constants/mockData';

interface StitchHeroProps {
  event?: WakeEvent | null;
}

export default function StitchHero({ event }: StitchHeroProps) {
  const displayTitle = event?.title || "Discover Your Next Wake County Adventure";
  const displayImage = event?.imageURL || "https://images.unsplash.com/photo-1514525253361-bee1455009f2?q=80&w=2000&auto=format&fit=crop";
  const displayDesc = event?.description || "From concerts under the stars to weekend farmers markets, uncover the best stories across all 12 municipalities.";
  const displayLink = event ? `/events/${event.id}` : "/blog/1";

  return (
    <section className="relative w-full h-[618px] flex items-end overflow-hidden">
      <img 
        alt={displayTitle} 
        className="absolute inset-0 w-full h-full object-cover" 
        src={displayImage}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
      <div className="relative z-10 p-10 w-full pb-16">
        <span className="inline-block px-3 py-1 bg-tertiary text-on-tertiary text-[10px] font-black uppercase tracking-widest rounded-full mb-4 animate-pulse">
          {event ? "Activity of the Day" : "Featured Guide"}
        </span>
        <h1 className="text-5xl font-black font-headline text-white leading-[1.1] tracking-tighter mb-4 max-w-2xl text-balance drop-shadow-2xl">
          {displayTitle}
        </h1>
        <p className="text-white/90 font-bold text-sm mb-8 max-w-sm drop-shadow-lg leading-relaxed">{displayDesc}</p>
          <Link 
            href={`/events/${event?.id}`} 
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:translate-y-[-2px] active:translate-y-0"
          >
            Learn More
          </Link>
      </div>
    </section>
  );
}
