"use client";

import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';
import { motion } from 'framer-motion';
import { useUserPreferences } from '@/components/context/UserPreferencesContext';

interface BreakoutGroup {
  title: string;
  icon: string;
  color: string;
  events: WakeEvent[];
}

export default function StitchCityBreakouts({ city }: { city: string }) {
  const [events, setEvents] = React.useState<WakeEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { preferences } = useUserPreferences();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'events')), (snapshot) => {
      const allEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WakeEvent[];
      
      const cityLower = city.toLowerCase();
      const citySlug = cityLower.replace(/ /g, '-');
      
      let filtered = allEvents.filter(e => {
        const m = e.municipality?.toLowerCase() || '';
        return m === cityLower || m.replace(/ /g, '-') === citySlug;
      });

      // Apply Parent Mode Filter
      if (preferences.kidFriendlyOnly) {
        filtered = filtered.filter(e => e.kidFriendly);
      }

      setEvents(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [city, preferences.kidFriendlyOnly]);

  const groups = React.useMemo(() => {
    const categories: BreakoutGroup[] = [
      { title: 'Concerts & Live Music', icon: 'music_note', color: 'text-primary bg-primary/5', events: [] },
      { title: 'For Families & Kids', icon: 'child_care', color: 'text-secondary bg-secondary/5', events: [] },
      { title: 'Workshops & Learning', icon: 'school', color: 'text-tertiary bg-tertiary/5', events: [] },
      { title: 'Community Festivals', icon: 'festival', color: 'text-amber-600 bg-amber-50', events: [] },
    ];

    events.forEach(event => {
      const content = (event.title + (event.description || '')).toLowerCase();
      if (content.includes('music') || content.includes('concert') || content.includes('jazz')) {
        categories[0].events.push(event);
      } else if (content.includes('kids') || content.includes('family') || content.includes('child')) {
        categories[1].events.push(event);
      } else if (content.includes('workshop') || content.includes('class') || content.includes('learn')) {
        categories[2].events.push(event);
      } else {
        categories[3].events.push(event);
      }
    });

    return categories.filter(g => g.events.length > 0);
  }, [events]);

  if (loading) {
    return <div className="p-8 space-y-8 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-48 bg-slate-100 rounded-[2rem]" />
      ))}
    </div>;
  }

  if (events.length === 0) {
    return (
      <div className="p-12 text-center bg-surface-container rounded-[2rem] border-2 border-dashed border-outline-variant/20 mx-6 my-8">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant/20 mb-4">event_busy</span>
        <h3 className="text-lg font-black font-headline text-on-surface-variant/40 uppercase tracking-widest">{preferences.kidFriendlyOnly ? 'No family activities currently' : 'No local breakouts yet'}</h3>
        <p className="text-sm text-on-surface-variant/30 mt-2 font-medium">Our AI is currently curating unique experiences for {city}. Check back shortly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 px-6 py-12">
      {groups.map((group, gIdx) => (
        <section key={group.title} className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${group.color}`}>
              <span className="material-symbols-outlined text-2xl">{group.icon}</span>
            </div>
            <div>
              <h2 className="text-2xl font-black font-headline text-on-surface uppercase tracking-tighter">{group.title}</h2>
              <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.2em]">{group.events.length} Curated Experiences in {city}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.events.map((event, eIdx) => (
              <motion.div 
                key={event.id}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all"
              >
                <Link href={`/events/${event.id}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={event.imageURL || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'} 
                      alt={event.title}
                      className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-black italic text-primary uppercase tracking-widest">Featured In {city}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant/30"></span>
                      <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{event.date}</span>
                    </div>
                    <h3 className="text-xl font-black font-headline text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 opacity-70 leading-relaxed font-medium mb-4">{event.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/5">
                        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">{event.location}</span>
                        <span className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">Details &rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
