"use client";

import React, { useState, useEffect } from 'react';
import { useUserPreferences } from '@/components/context/UserPreferencesContext';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function StitchCalendarGrid({ city }: { city?: string }) {
  const { preferences, setSelectedDate } = useUserPreferences();
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 26)); 
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'events')), (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data() as WakeEvent;
        // Simple date matching for count - assumes date is consistently formatted or contains name
        // We'll just use the raw date for now or ideally a date tag
        const d = data.date || '';
        counts[d] = (counts[d] || 0) + 1;
      });
      setEventCounts(counts);
    });
    return () => unsubscribe();
  }, []);

  const handleMonthChange = (offset: number) => {
    const nextDate = new Date(viewDate);
    nextDate.setMonth(nextDate.getMonth() + offset);
    setViewDate(nextDate);
  };

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, current: true });
  }

  return (
    <div className="bg-surface-container-low rounded-[2rem] p-6 shadow-sm border border-outline-variant/10">
      <div className="flex justify-between items-center mb-6 px-1">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Regional Discovery</h3>
          <p className="text-sm font-black uppercase tracking-widest text-on-surface">
            {MONTHS[currentMonth]} {currentYear}
          </p>
        </div>
        <div className="flex gap-1">
          <button onClick={() => handleMonthChange(-1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button onClick={() => handleMonthChange(1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(day => (
          <div key={day} className="text-center text-[9px] font-black uppercase text-on-surface-variant/30 py-2">{day}</div>
        ))}
        {calendarDays.map((d, i) => {
          if (d.day === null) return <div key={`pad-${i}`} className="p-2" />;

          const dayStr = d.day.toString();
          // Heuristic for matching date strings like "March 26, 2026"
          const fullDateStr = `${MONTHS[currentMonth]} ${dayStr}, ${currentYear}`;
          const count = eventCounts[fullDateStr] || 0;
          
          const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${d.day.toString().padStart(2, '0')}`;
          const isActive = preferences.selectedDate === dateStr;

          return (
            <div 
              key={i} 
              onClick={() => setSelectedDate(isActive ? null : dateStr)}
              className={`
                aspect-square flex flex-col items-center justify-center text-[10px] font-black rounded-xl cursor-pointer transition-all active:scale-90 relative
                ${isActive ? 'bg-primary text-white shadow-lg ring-2 ring-primary ring-offset-2' : ''}
                ${d.current && !isActive ? 'text-on-surface hover:bg-surface-container-high' : ''}
              `}
            >
              <span>{d.day}</span>
              {count > 0 && !isActive && (
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(Math.min(count, 3))].map((_, idx) => (
                    <div key={idx} className="w-1 h-1 rounded-full bg-primary/40"></div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {preferences.selectedDate && (
        <button onClick={() => setSelectedDate(null)} className="w-full mt-4 py-2 border-2 border-primary/10 text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-primary/5 transition-colors text-primary">
          Clear Selection
        </button>
      )}
    </div>
  );
}
