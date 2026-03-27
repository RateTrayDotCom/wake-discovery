"use client";

import React from 'react';
import Link from 'next/link';

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Street Food Festival',
    time: 'Tomorrow, 12:00 PM',
    type: 'tertiary'
  },
  {
    id: 2,
    title: 'Gallery Opening: Mono',
    time: 'Wed, 6:00 PM',
    type: 'primary'
  },
  {
    id: 3,
    title: 'Weekly Farmers Market',
    time: 'Thu, 7:30 PM',
    type: 'secondary'
  }
];

const COLORS = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary'
};

export default function StitchUpcomingList({ title = "Upcoming This Week" }: { title?: string }) {
  return (
    <section>
      <h2 className="text-xl font-black font-headline text-on-surface mb-6">{title}</h2>
      <div className="space-y-4">
        {UPCOMING_EVENTS.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`w-1.5 h-10 rounded-full ${COLORS[event.type as keyof typeof COLORS]}`}></div>
              <div>
                <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{event.title}</p>
                <p className="text-on-surface-variant text-xs">{event.time}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
