"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CategoryDiscoveryPage() {
  const params = useParams();
  const category = params.category as string;
  const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ');

  const [events, setEvents] = React.useState<WakeEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'events')), (snapshot) => {
      const allEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WakeEvent[];

      const filtered = allEvents.filter(e => {
        const content = (e.title + (e.description || '')).toLowerCase();
        if (decodedCategory.includes('kids')) return content.includes('kid') || content.includes('family') || content.includes('child');
        if (decodedCategory.includes('concert')) return content.includes('music') || content.includes('concert') || content.includes('jazz');
        if (decodedCategory.includes('food')) return content.includes('food') || content.includes('drink') || content.includes('restaurant') || content.includes('market');
        return content.includes(decodedCategory);
      });

      setEvents(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [decodedCategory]);

  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      
      <main className="pt-24 pb-24 max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-black font-headline text-on-surface uppercase tracking-tight mb-4">
             Discover <span className="text-primary italic">{decodedCategory}</span>
          </h1>
          <p className="text-sm font-bold text-on-surface-variant/40 uppercase tracking-[0.3em]">County-wide themed exploration</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-surface-container-low rounded-3xl" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="p-20 text-center border-2 border-dashed border-outline-variant/20 rounded-[3rem]">
            <h3 className="text-xl font-black text-on-surface-variant/40 uppercase tracking-widest">No matching activities found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/events/${event.id}`} className="group block bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={event.imageURL} alt={event.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">{event.municipality}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black font-headline text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">{event.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{event.date}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <StitchBottomNav />
    </div>
  );
}
