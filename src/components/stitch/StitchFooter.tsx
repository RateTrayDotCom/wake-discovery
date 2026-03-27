"use client";

import React from 'react';
import Link from 'next/link';

const FOOTER_LINKS = [
  {
    title: "Discovery",
    links: [
      { name: "Events", href: "/map" },
      { name: "Concerts", href: "/news/category/concerts" },
      { name: "For Kids", href: "/news/category/kids" },
      { name: "Food & Drink", href: "/news/category/food-drink" },
      { name: "Wake Atlas", href: "/map" }
    ]
  },
  {
    title: "Municipalities",
    links: [
      { name: "Raleigh", href: "/news/raleigh" },
      { name: "Cary", href: "/news/cary" },
      { name: "Apex", href: "/news/apex" },
      { name: "Holly Springs", href: "/news/holly-springs" },
      { name: "Wake Forest", href: "/news/wake-forest" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Submit Event", href: "/submit" },
      { name: "Newsletter", href: "/newsletter" },
      { name: "Contact", href: "/contact" }
    ]
  }
];

export default function StitchFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20 px-6 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                <span className="material-symbols-outlined text-on-primary text-xl">explore</span>
              </div>
              <span className="text-2xl font-black font-headline tracking-tighter text-white">WAKE DISCOVERY</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-8">
              The premium, autonomous discovery engine for all of Wake County. From concerts in Raleigh to farmers markets in Wendell, we define what it means to discover local.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                   <span className="material-symbols-outlined text-lg">public</span>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map(section => (
            <div key={section.title}>
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-bold hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 Wake Discovery Hub. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-primary">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
