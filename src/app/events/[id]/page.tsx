"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import StitchHeader from "@/components/stitch/StitchHeader";
import StitchEventDetails from "@/components/stitch/StitchEventDetails";
import StitchBottomNav from "@/components/stitch/StitchBottomNav";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [event, setEvent] = useState<WakeEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadEvent = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'events', id));
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() } as WakeEvent);
        }
      } catch (e) {
        console.error("Event load error:", e);
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-950"></div>;
  if (!event) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Event not found</div>;

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
