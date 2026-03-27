"use client";

import React from 'react';
import Link from 'next/link';
import { useUserPreferences } from '@/components/context/UserPreferencesContext';

const DISCOVER_ITEMS = [
  {
    id: 1,
    category: 'Events',
    title: 'Weekend Farmers Market: Spring Harvest Celebration',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_ztKuNdaHRCSSgTDRu5C4T95mw0xE5AJyv7BDPmW-Sy9GsWLa7OkQ_aNUEfjUz15YdS3HadgNxDWXChq6HzxRX_E0zjegXETNJ2giXKlWIp12Va84aKeuvK3Sps_FYRT0PfH6Bf3WOhuS1Na59lBUr_8A4l5mytmWr3JqMx7azXxrUXR_2r0tWw4YWqENkfIJ8dWH18BtCSW4HdCavHLdGJ0uGQFzOY_BqmnplFbGcnVLp1zziVn9TLSzQYZUbNpm4bL7Ja_OAGs'
  },
  {
    id: 2,
    category: 'Concerts',
    title: 'Outdoor Jazz Nights at Town Square',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQbxhJSedy7JT-zPCUg9-1dfhk_SLtMxZo3QgFVR1onVCgIyJWhIegqWWU_f7sKoCK5iIvcg9vVd1tHn-mtni6Hr9lOfSo3lfi_OxiYfHPEBZxesnahPI5g3oNSnuawS7RDbuwuF7IrCrdLFQasMCYmkh99wve7knkjmRq_HvmRhSKDukyZU7FG0JhPFg_61kp8IBEWTVe-Wn3V75DXW_laXsszRJr0L3nnp2hBIW5gajx2IrKDRqNG454PkfS2voOMDlqi2qKEog'
  },
  {
    id: 3,
    category: 'Kids',
    title: 'Family Discovery Day: Science & Nature Workshop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVr_zZxR59690QLlSoOiFqYbNFqk_pcDm4zS2XfGNw9QGVW-L10NRQ7WemYAulISr4umppSPvAn188gAMASoOK-dT0buRFRncVTXPbTwTy09CmuoxZRWyRCBZh_mi2cnqC983AwPFQu0kBie3pu_Xn50ydsYg07kpebMEPd9zYZvHkxC3yxoiLXSDtQ8-Fk5czBkBTXRjFrCqVwlBdqqpkmb-dND-oRFLs1k68kQR30xaHjyXggzWYb2kxptO_R7q_bKXgCIOXb2k'
  }
];

export default function StitchDiscoverFeed({ sidebar = false }: { sidebar?: boolean }) {
  const { preferences } = useUserPreferences();
  
  const filteredItems = React.useMemo(() => {
    if (!preferences.kidFriendlyOnly) return DISCOVER_ITEMS;
    return DISCOVER_ITEMS.filter(item => item.category === 'Kids' || item.title.toLowerCase().includes('family'));
  }, [preferences.kidFriendlyOnly]);

  if (sidebar) {
    return (
      <section className="space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-6">Discovery</h4>
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <Link key={item.id} href="/blog/1" className="flex gap-4 items-start group cursor-pointer border-b border-outline-variant/10 pb-4 last:border-0 last:pb-0">
              <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-surface-container-high">
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                  src={item.image}
                />
              </div>
              <div className="flex-1">
                <span className="text-secondary text-[8px] font-bold uppercase tracking-widest mb-1 block">
                  {item.category}
                </span>
                <h4 className="font-headline font-bold text-[13px] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-4 px-6 py-12 bg-surface-container">
      <h2 className="text-3xl font-black font-headline text-on-surface mb-8 tracking-tighter uppercase">Discover More</h2>
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <Link key={item.id} href="/blog/1" className="flex gap-6 items-start group cursor-pointer bg-white/50 dark:bg-slate-900/50 p-6 rounded-[2rem] hover:bg-white dark:hover:bg-slate-900 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-surface-container-high shadow-lg">
              <img 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                src={item.image}
              />
            </div>
            <div className="flex-1">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3 inline-block">
                {item.category}
              </span>
              <h4 className="font-headline font-black text-xl leading-tight group-hover:text-primary transition-colors mb-2">
                {item.title}
              </h4>
               <p className="text-sm text-on-surface-variant line-clamp-2 opacity-70 leading-relaxed font-medium">A deeper exploration into the narratives that shape our urban environment and regional identity.</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
