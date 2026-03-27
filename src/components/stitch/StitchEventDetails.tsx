"use client";

import React from 'react';

interface Props {
  event: {
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    description: string;
    image: string;
  };
}

export default function StitchEventDetails({ event }: Props) {
  return (
    <div className="bg-surface min-h-screen">
      <div className="relative h-[400px] w-full">
        <img 
          alt={event.title} 
          className="w-full h-full object-cover" 
          src={event.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
           <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">{event.category}</span>
           <h1 className="text-4xl font-black font-headline text-on-surface leading-tight tracking-tight">{event.title}</h1>
        </div>
      </div>

      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-center py-6 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-on-primary-container">
              <span className="text-[10px] font-bold uppercase leading-none">Oct</span>
              <span className="text-lg font-black leading-none">24</span>
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">{event.date}</p>
              <p className="text-xs text-on-surface-variant">{event.time}</p>
            </div>
          </div>
          <button className="bg-secondary text-on-secondary p-3 rounded-2xl shadow-lg active:scale-95 transition-transform">
            <span className="material-symbols-outlined">bookmark_add</span>
          </button>
        </div>

        <div className="flex gap-4 items-center p-4 bg-surface-container-low rounded-2xl">
           <span className="material-symbols-outlined text-primary">location_on</span>
           <div>
             <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-none mb-1">Location</p>
             <p className="text-sm font-bold text-on-surface">{event.location}</p>
           </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-on-surface-variant font-body leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="pt-8">
           <button className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black font-headline uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transition-shadow">
             Attend This Event
           </button>
        </div>
      </div>
    </div>
  );
}
