"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NEWS_ITEMS = [
  {
    id: 1,
    featured: true,
    municipality: 'Raleigh',
    category: 'Entertainment',
    title: 'Top 10 Outdoor Concert series for Late Spring in Wake County',
    excerpt: 'From Red Hat Amphitheater to local town squares, here is your definitive guide to live music under the stars.',
    date: 'Mar 25, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSs_tN-TtJSJDEwanA8dWoz4_2sjNdNt66-eRMFy1xjj9X7Xls5g4Z9aGuQ6oTberRDPmAXLGOxq588KsOb8EOet29c45JkUA28kRFizg64PXhdFCcv35QtrPZ_oyfraS9ZS_bz2udImyQc4qUlYh8_CLVYp6G9UpEav-h05nFdShamM9I3niLzEsCH1jKUFfVYT2KJmVT3GzLQTBPjk6JebRrkJlc7VktoTQe_cJS9v4yLopDZiOHri7r07m51ncxjrYl8NXefk'
  },
  {
    id: 2,
    featured: false,
    municipality: 'Cary',
    category: 'Kids',
    title: 'Hidden Gem Playgrounds in Cary You Didn\'t Know Existed',
    excerpt: 'Skip the crowds at Bond Park and discover these quiet, high-quality play areas perfect for a Saturday morning.',
    date: 'Mar 24, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSs_tN-TtJSJDEwanA8dWoz4_2sjNdNt66-eRMFy1xjj9X7Xls5g4Z9aGuQ6oTberRDPmAXLGOxq588KsOb8EOet29c45JkUA28kRFizg64PXhdFCcv35QtrPZ_oyfraS9ZS_bz2udImyQc4qUlYh8_CLVYp6G9UpEav-h05nFdShamM9I3niLzEsCH1jKUFfVYT2KJmVT3GzLQTBPjk6JebRrkJlc7VktoTQe_cJS9v4yLopDZiOHri7r07m51ncxjrYl8NXefk'
  },
  {
    id: 3,
    featured: false,
    municipality: 'Apex',
    category: 'Food & Drink',
    title: 'The Best Patio Dining Spots in Downtown Apex',
    excerpt: 'Spring is here! Enjoy the weather with our curated list of the best outdoor seating and seasonal menus in the Peak City.',
    date: 'Mar 23, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQbxhJSedy7JT-zPCUg9-1dfhk_SLtMxZo3QgFVR1onVCgIyJWhIegqWWU_f7sKoCK5iIvcg9vVd1tHn-mtni6Hr9lOfSo3lfi_OxiYfHPEBZxesnahPI5g3oNSnuawS7RDbuwuF7IrCrdLFQasMCYmkh99wve7knkjmRq_HvmRhSKDukyZU7FG0JhPFg_61kp8IBEWTVe-Wn3V75DXW_laXsszRJr0L3nnp2hBIW5gajx2IrKDRqNG454PkfS2voOMDlqi2qKEog'
  }
];

export default function StitchNewsGrid({ town }: { town?: string }) {
  const filteredItems = town 
    ? NEWS_ITEMS.filter(i => i.municipality?.toLowerCase() === town.toLowerCase())
    : NEWS_ITEMS;

  const featured = filteredItems.find(i => i.featured) || filteredItems[0];
  const others = filteredItems.filter(i => i !== featured);

  return (
    <motion.section 
      layout
      className="px-6 py-8 space-y-12"
    >
      {/* Featured Story */}
      {featured && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link href={`/blog/${featured.id}`} className="group cursor-pointer block">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-surface-container-high mb-6 relative shadow-sm group-hover:shadow-xl transition-all duration-500">
               <img 
                alt={featured.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
                src={featured.image}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{featured.category}</span>
              </div>
            </div>
            <h2 className="text-3xl font-black font-headline text-on-surface mb-3 group-hover:text-primary transition-colors leading-tight">{featured.title}</h2>
            <p className="text-on-surface-variant font-body text-md mb-4 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center gap-3 text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">
              <span>{featured.date}</span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid of smaller stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {others.map((item, idx) => (
          <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={`/blog/${item.id}`} className="group cursor-pointer flex flex-col">
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-surface-container-high mb-4 relative shadow-sm group-hover:shadow-lg transition-all">
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                  src={item.image}
                />
                 <div className="absolute top-3 left-3">
                  <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">{item.category}</span>
                </div>
              </div>
              <h3 className="text-xl font-black font-headline text-on-surface mb-2 pt-2 group-hover:text-primary transition-colors leading-snug">{item.title}</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                <span>{item.date}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-xl border-2 border-outline-variant hover:bg-surface-container-low transition-colors font-bold uppercase tracking-[0.2em] text-xs text-on-surface-variant"
      >
        Load More Stories
      </motion.button>
    </motion.section>
  );
}
