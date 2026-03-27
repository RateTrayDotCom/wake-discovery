"use client";

import React from 'react';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchRealMap from "@/components/stitch/StitchRealMap";
import StitchEventList from "@/components/stitch/StitchEventList";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";
import { motion } from "framer-motion";

export default function MapDiscoveryPage() {
  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      
      <main className="pt-16 pb-24 md:pb-8 max-w-[1440px] mx-auto min-h-screen">
        <div className="px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h1 className="text-4xl font-black font-headline text-on-surface uppercase tracking-tight">
                Wake <span className="text-primary tracking-[0.2em] font-light ml-2">Atlas</span>
              </h1>
              <p className="text-on-surface-variant text-sm mt-2 opacity-60 font-body uppercase tracking-[0.2em]">Explore current activities geographically across the county</p>
           </div>
        </div>

        <div className="px-6 space-y-12">
          {/* Full Screen Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <StitchRealMap fullScreen={true} />
          </motion.div>

          {/* Activity List */}
          <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-outline-variant/30"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/40">Today's Pulse Schedule</h2>
              <div className="h-px flex-1 bg-outline-variant/30"></div>
            </div>
            
            <StitchEventList />
          </div>
        </div>
      </main>

      <StitchBottomNav />
    </div>
  );
}
