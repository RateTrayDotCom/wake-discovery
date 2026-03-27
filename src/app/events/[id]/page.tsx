"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchEventDetails from "@/components/stitch/StitchEventDetails";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id;

  // Mock event data for demonstration
  const event = {
    title: "Street Food Festival 2025",
    date: "Saturday, Oct 24, 2025",
    time: "12:00 PM - 8:00 PM",
    location: "Central Plaza, Main St.",
    category: "Food & Culture",
    description: "Experience the city's most vibrant culinary celebration. With over 50 local vendors, live music performances, and interactive cooking workshops, the Street Food Festival is our community's largest gathering of the season.\n\nJoin us for a day of discovery as we celebrate the diverse flavors that make our town unique. From artisanal sourdough to authentic street tacos, there's something for every palate.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSs_tN-TtJSJDEwanA8dWoz4_2sjNdNt66-eRMFy1xjj9X7Xls5g4Z9aGuQ6oTberRDPmAXLGOxq588KsOb8EOet29c45JkUA28kRFizg64PXhdFCcv35QtrPZ_oyfraS9ZS_bz2udImyQc4qUlYh8_CLVYp6G9UpEav-h05nFdShamM9I3niLzEsCH1jKUFfVYT2KJmVT3GzLQTBPjk6JebRrkJlc7VktoTQe_cJS9v4yLopDZiOHri7r07m51ncxjrYl8NXefk"
  };

  return (
    <div className="min-h-screen bg-surface">
      <StitchHeader />
      <main className="pt-16 pb-24">
        <StitchEventDetails event={event} />
      </main>
      <StitchBottomNav />
    </div>
  );
}
