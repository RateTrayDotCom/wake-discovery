"use client";

import React from 'react';
import Link from 'next/link';

const CONCERTS = [
  {
    id: 1,
    date: '14',
    month: 'Oct',
    category: 'Indie Rock',
    title: 'The Midnight Echoes',
    location: 'The Electric Lounge',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA73k68uCSz64DkcyAgxbG7dzcKu_qa0nGMUKmZK0bqX1dMBBpz1I9QjSMjzcrzswoqEK08QwZxIJrOe3tyBG7og1uRp09FwMG6OigpLYsqTNmsr3R6Z1QwA8dcZJhVy2iIhOMpUmtyv7SfivhTX4mPSFX3w5V2rOGC6isNK-kzYOmIcZv-nHM_677D8vtck8hV7cequcWclztr9vAC8J3Uy12noNb3fN2rauOqQDbdsujHZrMQyuJeRlxmN82AeCXlTjEbV4fvDoA'
  },
  {
    id: 2,
    date: '18',
    month: 'Oct',
    category: 'Acoustic',
    title: 'Sara Jenkins Unplugged',
    location: 'Metro Arena',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdkkqb5HKCUS40xLAIKuQf_DUIseOxVhWPRaXNRA2ZwDkr9koIv6HbcJvzy8PZ5_riSr8qbyyZAaCsw7RAIRkAwqo7cyRfvQ_sHIVnK-raskhhCBhWg9jKe-ixrHUpNjSIkgWhcOKXA2jhzOp_F-Dk8-2u3Ihhe9P9ALnSErhfLTamq2yhJ97x6fVS2Zt2U-u0L_83hooMlq_5uxdHNjETrVD8CTMYxn24sf8_dfqDx5QeYOPmWcaVJ98qCPu-kNuvxg5eqrWYvMI'
  },
  {
    id: 3,
    date: '22',
    month: 'Oct',
    category: 'Classical',
    title: 'City Symphony Nights',
    location: 'Civic Hall',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1-Z1Q-Gw1cnDTlxHI_LXs6MQOzbK5oFAaethe3m4BS5d7ux1ir9v7SQxGSRjaCghRlv9mQbgFzCDr8lEkhflosE54JDhQecoE2DyXPl0U9Ft1CHrq7OM9d_gLy1l-ol-5_eJWIyveG9gqqvAmWjQepzhV-lJhLJv4YIQ2qG77IxRWJcQ3opCnN4yQLWs709seffwiSiHVaGJGnQfSeuHPvjPerESzNVBkxEkc35jf99JuOx_mf3ppKWpuZ6vd9xZUCfJ2M9biYXA'
  },
  {
    id: 4,
    date: '25',
    month: 'Oct',
    category: 'Electronic',
    title: 'Techno Pulse: Under30',
    location: 'Warehouse 9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBypjWjOMdHYntwDGAh8Fy35ZT3ikh9VG6tN9FL8Uw3_xvqE-8Em7mjTX4gEw99zS-frRfKEJScQIrqTI3Sjw345i5ChTcOk1jh4cgXJoMlKTKkuyVj9ZnnL7rFZVuY2iTz9JwjZEWAQ3q89pANUrdhVyA_FadZzEDrhGv4QfrKGb-sIMo3alQZwTPOnm1osVmFktTeBxbLmLVtNdmH92G-Eqbq788P4BCfJssh0suXarOJFc8Gx_9WysvGsPkOATdoFu52Cv9C3gA'
  }
];

export default function StitchConcertScroll() {
  return (
    <section className="mt-12 px-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-1 block">Live Experience</span>
          <h2 className="text-2xl font-black font-headline text-on-surface">Featured Concerts</h2>
        </div>
        <Link href="/events" className="text-primary text-xs font-bold uppercase tracking-wider">See All</Link>
      </div>
      <div className="flex overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory gap-6">
        {CONCERTS.map((concert) => (
          <Link key={concert.id} href={`/events/${concert.id}`} className="min-w-[85%] md:min-w-[320px] snap-start bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col group cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img 
                alt={concert.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                src={concert.image}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded px-3 py-1 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase text-on-surface-variant">{concert.month}</span>
                <span className="text-lg font-black leading-none text-primary">{concert.date}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                    {concert.category}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg mb-1 leading-tight group-hover:text-primary transition-colors">{concert.title}</h3>
                <p className="text-on-surface-variant text-sm flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {concert.location}
                </p>
              </div>
              <button className="w-full bg-secondary text-white py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">Learn More</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
