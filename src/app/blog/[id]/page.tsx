"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchContentArticle from "@/components/stitch/StitchContentArticle";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";

export default function BlogPostPage() {
  const params = useParams();
  const id = params?.id;

  // Mock article data
  const article = {
    title: "Rethinking Verticality: The Urban Forest Towers of 2025",
    date: "Oct 23, 2025",
    category: "Architecture",
    content: "The skyline of our city is undergoing a radical transformation. No longer defined solely by glass and steel, a new generation of architects is introducing living ecosystems into the heart of the urban core.\n\nThese 'Urban Forest Towers' are more than just buildings with balconies; they are complex biological machines designed to sequester carbon, regulate local microclimates, and provide much-needed habitat for displaced urban wildlife.\n\nAs we look toward the next decade, the integration of nature and infrastructure will become the defining challenge of our generation. The projects currently breaking ground in our downtown district are just the beginning of a greener, more resilient future.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQbxhJSedy7JT-zPCUg9-1dfhk_SLtMxZo3QgFVR1onVCgIyJWhIegqWWU_f7sKoCK5iIvcg9vVd1tHn-mtni6Hr9lOfSo3lfi_OxiYfHPEBZxesnahPI5g3oNSnuawS7RDbuwuF7IrCrdLFQasMCYmkh99wve7knkjmRq_HvmRhSKDukyZU7FG0JhPFg_61kp8IBEWTVe-Wn3V75DXW_laXsszRJr0L3nnp2hBIW5gajx2IrKDRqNG454PkfS2voOMDlqi2qKEog"
  };

  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      <main className="pt-16 pb-24">
        <StitchContentArticle article={article} />
      </main>
      <StitchBottomNav />
    </div>
  );
}
