"use client";

import React from 'react';

export default function StitchNewsletter() {
  return (
    <section className="mt-16 mx-6 p-8 rounded-3xl bg-primary text-on-primary text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-tertiary/10 rounded-full -ml-12 -mb-12"></div>
      <h3 className="text-2xl font-black font-headline mb-4 relative z-10 text-white">Stay Informed</h3>
      <p className="text-white text-sm mb-6 relative z-10 opacity-90">Join our weekly newsletter for curated events and investigative stories delivered to your inbox.</p>
      <div className="space-y-3 relative z-10 max-w-md mx-auto">
        <input 
          className="w-full bg-white border-none text-slate-900 text-sm rounded-lg px-4 py-3 placeholder:text-black focus:ring-2 focus:ring-secondary outline-none" 
          placeholder="Your email address" 
          type="email"
        />
        <button className="w-full bg-secondary text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-lg hover:shadow-lg transition-shadow active:scale-[0.98]">
          Subscribe
        </button>
      </div>
      <p className="text-[10px] mt-4 text-white/50 uppercase tracking-widest font-black">No Spam. Ever.</p>
    </section>
  );
}
