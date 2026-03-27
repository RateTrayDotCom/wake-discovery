"use client";

import React from 'react';
import Link from 'next/link';

export default function StitchBlogSnippet() {
  return (
    <section className="px-6 py-12 border-t border-outline-variant/10 mt-12">
       <div className="bg-surface-container rounded-[3rem] p-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
             <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Regional Insider Post</span>
             <h2 className="text-4xl font-black font-headline text-on-surface uppercase tracking-tight mb-6">Why Wake County’s Spring Festivals are the Best in the South</h2>
             <p className="text-on-surface-variant font-medium leading-relaxed mb-8 opacity-80">From Brewgaloo in Raleigh to the Apex PeakFest, we go behind the scenes to see how our municipalities are planning this year's massive celebration of community and culture.</p>
             <Link href="/blog/1" className="inline-block px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg hover:shadow-2xl transition-all active:scale-95">Read Full Insight</Link>
          </div>
          <div className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative group">
             <img 
               src="/images/blog.png" 
               className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
               alt="Blog feature"
             />
             <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
          </div>
       </div>
    </section>
  );
}
