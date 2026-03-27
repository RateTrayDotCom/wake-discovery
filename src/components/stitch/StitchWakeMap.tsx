"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';

export default function StitchWakeMap() {
  const router = useRouter();
  const [events, setEvents] = React.useState<WakeEvent[]>([]);
  const [hoveredEvent, setHoveredEvent] = React.useState<WakeEvent | null>(null);

  React.useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WakeEvent[];
      setEvents(liveEvents);
    });
    return () => unsubscribe();
  }, []);

  // Simplified Wake County Municipality Shapes (Abstracted SVG)
  const TOWNS = [
    { name: "Raleigh", path: "M 100 100 L 150 80 L 180 120 L 140 150 Z", slug: "raleigh", color: "fill-red-500", cx: 140, cy: 110 },
    { name: "Cary", path: "M 80 120 L 100 100 L 120 130 L 70 140 Z", slug: "cary", color: "fill-emerald-600", cx: 90, cy: 120 },
    { name: "Apex", path: "M 50 140 L 80 120 L 90 150 L 40 160 Z", slug: "apex", color: "fill-maroon-700", cx: 65, cy: 140 },
    { name: "Holly Springs", path: "M 40 160 L 90 150 L 100 180 L 30 190 Z", slug: "holly-springs", color: "fill-blue-800", cx: 65, cy: 170 },
    { name: "Wake Forest", path: "M 120 40 L 160 30 L 170 60 L 110 70 Z", slug: "wake-forest", color: "fill-gold-600", cx: 140, cy: 50 },
    { name: "Morrisville", path: "M 70 90 L 100 80 L 110 110 L 60 120 Z", slug: "morrisville", color: "fill-slate-800", cx: 85, cy: 100 },
    { name: "Garner", path: "M 150 150 L 190 140 L 200 170 L 140 180 Z", slug: "garner", color: "fill-blue-600", cx: 170, cy: 160 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto bg-surface-container rounded-3xl p-8 border border-outline-variant/30 overflow-hidden group">
      <div className="absolute top-6 left-6 z-10">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Discovery Map</h4>
        <p className="text-xl font-black font-headline text-on-surface">LOCATE <span className="text-primary italic">PULSE</span></p>
      </div>

      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-on-surface/10"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none" />

        {TOWNS.map((town, i) => (
          <motion.path
            key={town.name}
            d={town.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={`${town.color} opacity-40 cursor-pointer stroke-white/20 stroke-1 hover:opacity-100 transition-opacity pointer-events-auto`}
            onClick={() => router.push(`/news/${town.slug}`)}
          >
            <title>{town.name}</title>
          </motion.path>
        ))}

        {/* Dynamic Markers for Events */}
        {events.map((event) => {
          const town = TOWNS.find(t => t.slug === event.municipality?.toLowerCase().replace(/ /g, '-'));
          if (!town) return null;

          // Simple jitter around center
          const jitterX = Math.sin(event.id.length) * 10;
          const jitterY = Math.cos(event.id.length) * 10;

          return (
            <motion.g
              key={event.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.5 }}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/events/${event.id}`);
              }}
              onMouseEnter={() => setHoveredEvent(event)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <circle 
                cx={town.cx + jitterX} 
                cy={town.cy + jitterY} 
                r="3" 
                className="fill-primary" 
              />
              <circle 
                cx={town.cx + jitterX} 
                cy={town.cy + jitterY} 
                r="6" 
                className="fill-primary/20 animate-pulse" 
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Mini Tooltip */}
      <AnimatePresence>
        {hoveredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-24 left-6 right-6 bg-surface-container-high/90 backdrop-blur-md p-4 rounded-2xl border border-primary/20 shadow-2xl z-50 pointer-events-none"
          >
            <h5 className="text-xs font-black font-headline text-on-surface uppercase truncate">{hoveredEvent.title}</h5>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">{hoveredEvent.municipality} • {hoveredEvent.time || 'All Day'}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 text-right">
         <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-[8px] font-bold text-primary uppercase tracking-widest animate-pulse">Live Pulses: {events.length}</span>
      </div>
    </div>
  );
}
