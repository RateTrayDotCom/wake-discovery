"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserPreferences {
  followedTowns: string[];
  savedEvents: string[];
  kidFriendlyOnly: boolean;
  selectedDate: string | null;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  toggleFollowTown: (town: string) => void;
  toggleSaveEvent: (eventId: string) => void;
  setKidFriendlyOnly: (val: boolean) => void;
  setSelectedDate: (date: string | null) => void;
  isFollowing: (town: string) => boolean;
  isSaved: (eventId: string) => boolean;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    followedTowns: [],
    savedEvents: [],
    kidFriendlyOnly: false,
    selectedDate: '2026-03-26' // Default to today
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wake-pulse-prefs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          ...parsed,
          selectedDate: null // Reset date on fresh sessions
        });
      } catch (e) {
        console.error("Failed to parse prefs", e);
      }
    }
  }, []);

  // Save to localStorage when changed (except date)
  useEffect(() => {
    const toSave = { ...preferences, selectedDate: null };
    localStorage.setItem('wake-pulse-prefs', JSON.stringify(toSave));
  }, [preferences]);

  const toggleFollowTown = (town: string) => {
    setPreferences(prev => {
      const isFollowing = prev.followedTowns.includes(town);
      return {
        ...prev,
        followedTowns: isFollowing 
          ? prev.followedTowns.filter(t => t !== town)
          : [...prev.followedTowns, town]
      };
    });
  };

  const toggleSaveEvent = (eventId: string) => {
    setPreferences(prev => {
      const isSaved = prev.savedEvents.includes(eventId);
      return {
        ...prev,
        savedEvents: isSaved
          ? prev.savedEvents.filter(id => id !== eventId)
          : [...prev.savedEvents, eventId]
      };
    });
  };

  const setKidFriendlyOnly = (val: boolean) => {
    setPreferences(prev => ({ ...prev, kidFriendlyOnly: val }));
  };

  const setSelectedDate = (date: string | null) => {
    setPreferences(prev => ({ ...prev, selectedDate: date }));
  };

  const isFollowing = (town: string) => preferences.followedTowns.includes(town);
  const isSaved = (eventId: string) => preferences.savedEvents.includes(eventId);

  return (
    <UserPreferencesContext.Provider value={{ 
      preferences, 
      toggleFollowTown, 
      toggleSaveEvent, 
      setKidFriendlyOnly,
      setSelectedDate,
      isFollowing, 
      isSaved 
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}
