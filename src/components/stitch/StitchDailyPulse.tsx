"use client";

import React, { useEffect, useState } from 'react';
import { useUserPreferences } from '@/components/context/UserPreferencesContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function StitchDailyPulse() {
  const { preferences } = useUserPreferences();
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preferences.followedTowns.length > 0) {
      fetchSummary();
    }
  }, [preferences.followedTowns]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/daily-pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followedTowns: preferences.followedTowns })
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (preferences.followedTowns.length === 0) {
    return (
      <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Your Daily Discovery</h4>
        <p className="text-sm font-bold text-on-surface">Follow your favorite towns to get a personalized AI summary of the best things to do today.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/30 relative overflow-hidden text-slate-900	">
      <div className="absolute top-0 right-0 p-4">
         <span className="material-symbols-outlined text-primary/20 text-4xl">travel_explore</span>
      </div>
      
      <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Today's Top Activities
      </h4>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <div className="h-4 bg-on-surface/5 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-on-surface/5 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-on-surface/5 rounded w-4/6 animate-pulse"></div>
          </motion.div>
        ) : (
          <motion.p 
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium leading-relaxed text-on-surface italic"
          >
            "{summary}"
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
