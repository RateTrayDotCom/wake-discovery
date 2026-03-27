"use client";

import React from 'react';

const CATEGORIES = ['All', 'Entertainment', 'Music', 'Kids', 'Food & Drink', 'Outdoors', 'Festivals'];

export default function StitchCategorySwitcher() {
  const [active, setActive] = React.useState('All');

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 px-6 py-4 sticky top-16 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/30">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
            active === cat 
              ? 'bg-primary text-on-primary shadow-md' 
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
