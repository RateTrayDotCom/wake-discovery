"use client";

import React from 'react';

interface Props {
  article: {
    title: string;
    date: string;
    category: string;
    content: string;
    image: string;
  };
}

export default function StitchContentArticle({ article }: Props) {
  return (
    <article className="bg-surface min-h-screen">
      <div className="px-6 py-12 max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] font-headline">{article.category}</span>
          <h1 className="text-5xl font-black font-headline text-on-surface leading-[1.1] tracking-tight">{article.title}</h1>
          <div className="flex items-center gap-4 pt-4">
             <div>
                <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">{article.date} • 5 min read</p>
             </div>
          </div>
        </div>

        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-surface-container-high shadow-2xl skew-y-1">
           <img src={article.image} alt={article.title} className="w-full h-full object-cover -skew-y-1 scale-110" />
        </div>

        <div className="prose prose-lg prose-slate max-w-none font-body leading-relaxed text-on-surface-variant space-y-6">
           {article.content.split('\n').map((para, i) => (
             <p key={i}>{para}</p>
           ))}
        </div>

        <footer className="pt-12 border-t border-outline-variant/30">
           <div className="flex justify-between items-center">
              <div className="flex gap-4">
                 <button className="p-3 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">share</span></button>
                 <button className="p-3 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">bookmark</span></button>
              </div>
              <button className="text-primary font-black text-xs uppercase tracking-widest">Next Story &rarr;</button>
           </div>
        </footer>
      </div>
    </article>
  );
}
