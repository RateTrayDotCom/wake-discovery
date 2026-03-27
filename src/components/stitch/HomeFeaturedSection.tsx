"use client";

import React from 'react';
import { db } from '@/lib/firebase';
import { collection, query, limit, onSnapshot, orderBy } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';
import Link from 'next/link';

export default function HomeFeaturedSection({ category, title, color }: { category: string; title: string; color: string }) {
  const [events, setEvents] = React.useState<WakeEvent[]>([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'events'), limit(20)), (snapshot) => {
      const all = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as WakeEvent[];
      const filtered = all.filter(e => {
        const content = (e.title + (e.description || '')).toLowerCase();
        const isKids = category === 'kids';
        const isFood = category === 'food' || category === 'food-drink';
        
        if (isKids) return content.includes('kid') || content.includes('family');
        if (isFood) return content.includes('food') || content.includes('drink') || content.includes('market');
        return false;
      }).slice(0, 3);
      setEvents(filtered);
    });
    return () => unsubscribe();
  }, [category]);

  if (events.length === 0) return null;

  return (
    <section className="px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black font-headline uppercase tracking-tighter text-on-surface">{title}</h2>
        <Link href={`/news/category/${category}`} className={`px-4 py-2 rounded-full border border-outline-variant/30 text-[8px] font-black uppercase tracking-widest hover:border-primary transition-colors cursor-pointer`}>View All &rarr;</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
            <img src={event.imageURL} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={event.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className={`px-2 py-0.5 rounded-full ${color} text-white text-[8px] font-black uppercase tracking-widest mb-3 inline-block`}>{event.municipality}</span>
              <h3 className="text-white font-black font-headline text-lg group-hover:text-primary transition-colors leading-tight line-clamp-2">{event.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
