"use client";

import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';

import { useUserPreferences } from '@/components/context/UserPreferencesContext';
import { motion } from 'framer-motion';

export default function StitchEventList() {
  const [events, setEvents] = React.useState<WakeEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { preferences, toggleSaveEvent, isSaved } = useUserPreferences();

  React.useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WakeEvent[];
      setEvents(liveEvents);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Fetch error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayEvents = React.useMemo(() => {
    return events.filter(event => {
      // Date filter
      if (preferences.selectedDate) {
        // Very simple date string match for mock/scraped data consistency
        if (!event.date.includes(preferences.selectedDate.split('-')[2])) return false;
      }
      
      // Kid friendly filter (Keywords in title/description)
      if (preferences.kidFriendlyOnly) {
        const kidKeywords = ['kids', 'family', 'child', 'parent', 'science', 'workshop', 'playground'];
        const content = (event.title + event.description).toLowerCase();
        if (!kidKeywords.some(kw => content.includes(kw))) return false;
      }
      
      return true;
    });
  }, [events, preferences.selectedDate, preferences.kidFriendlyOnly]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-6 md:px-0">
        <h3 className="text-sm font-black font-headline uppercase tracking-widest text-on-surface-variant/60">
          {loading ? 'Synchronizing...' : preferences.selectedDate ? `Schedule for Oct ${preferences.selectedDate.split('-')[2]}` : 'Live Wake Schedule'}
        </h3>
        {preferences.kidFriendlyOnly && (
          <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-full">Parent Mode Active</span>
        )}
      </div>
      <div className="space-y-1 px-6 md:px-0">
        {displayEvents.length === 0 && !loading && (
          <div className="p-8 border-2 border-dashed border-outline-variant/10 rounded-[2rem] text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/30">No activities found for this selection.</p>
          </div>
        )}
        {displayEvents.map((event, idx) => {
          const saved = isSaved(event.id);
          return (
            <motion.div 
              key={event.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 5 }}
              className="flex gap-4 group cursor-pointer border-b border-outline-variant/10 py-5 last:border-0"
            >
              <Link href={`/events/${event.id}`} className="flex flex-1 gap-4">
                <div className="w-16 shrink-0 pt-1">
                  <span className="text-[11px] font-black font-headline text-on-surface uppercase tracking-tight">
                    {event.time || 'TBD'}
                  </span>
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{event.municipality}</span>
                     <span className="w-1 h-1 rounded-full bg-outline-variant/30"></span>
                     <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{event.location}</span>
                   </div>
                  <h4 className="font-black text-lg text-on-surface group-hover:text-primary transition-colors leading-[1.2] mb-2">{event.title}</h4>
                </div>
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleSaveEvent(event.id);
                }}
                className={`p-3 rounded-xl transition-all self-center ${
                  saved ? "text-primary bg-primary/10" : "text-on-surface-variant/20 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span className={`material-symbols-outlined text-lg ${saved ? 'fill-1' : ''}`}>
                  {saved ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
