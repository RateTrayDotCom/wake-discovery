"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { WakeEvent } from '@/constants/mockData';

import Link from 'next/link';

// Dynamic import for Leaflet components to avoid SSR errors
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const CITY_COORDS: Record<string, [number, number]> = {
  'raleigh': [35.7796, -78.6382],
  'cary': [35.7915, -78.7811],
  'apex': [35.7327, -78.8503],
  'holly-springs': [35.6513, -78.8336],
  'garner': [35.7115, -78.6142],
  'wake-forest': [35.9799, -78.5097],
  'morrisville': [35.8235, -78.8256],
  'fuquay-varina': [35.5843, -78.8000],
  'knightdale': [35.7885, -78.4842],
  'rolesville': [35.9188, -78.4553],
  'wendell': [35.7813, -78.3697],
  'zebulon': [35.8224, -78.3119],
};

interface StitchRealMapProps {
  fullScreen?: boolean;
  city?: string;
}

export default function StitchRealMap({ fullScreen = false, city }: StitchRealMapProps) {
  const [events, setEvents] = React.useState<WakeEvent[]>([]);
  const [L, setL] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);
  const [myLocation, setMyLocation] = React.useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

  React.useEffect(() => {
    setMounted(true);
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });

    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WakeEvent[];
      setEvents(liveEvents);
    });
    return () => unsubscribe();
  }, []);

  const filteredEvents = React.useMemo(() => {
    if (!city) return events;
    return events.filter(e => e.municipality?.toLowerCase() === city.toLowerCase() || e.municipality?.toLowerCase() === city.toLowerCase().replace(/-/g, ' '));
  }, [events, city]);

  const mapCenter = React.useMemo(() => {
    if (!city) return [35.7796, -78.6382] as [number, number];
    const slug = city.toLowerCase().replace(/ /g, '-').replace(/-/g, '-');
    return CITY_COORDS[slug] || [35.7796, -78.6382];
  }, [city]);

  const eventPositions = React.useMemo(() => {
    return filteredEvents.map(event => {
      const slug = event.municipality?.toLowerCase().replace(/ /g, '-');
      const basePos = CITY_COORDS[slug || ''];
      if (!basePos) return null;

      const hash = event.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const jitterX = ((hash % 100) / 100 - 0.5) * 0.01;
      const jitterY = (((hash * 13) % 100) / 100 - 0.5) * 0.01;

      return {
        id: event.id,
        position: [basePos[0] + jitterX, basePos[1] + jitterY] as [number, number],
        event
      };
    }).filter(p => p !== null);
  }, [filteredEvents]);

  const handleSetLocation = () => {
    const slug = searchQuery.toLowerCase().trim().replace(/ /g, '-');
    if (CITY_COORDS[slug]) {
      setMyLocation(CITY_COORDS[slug]);
    }
  };

  if (!mounted) {
    return <div className={`${fullScreen ? 'h-[500px]' : 'aspect-square'} w-full bg-slate-100 animate-pulse rounded-3xl`} />;
  }

  return (
    <div className={`relative w-full ${fullScreen ? 'h-[500px] rounded-none md:rounded-3xl' : 'aspect-square max-w-[400px]'} mx-auto bg-surface-container rounded-3xl overflow-hidden border border-outline-variant/30 group shadow-2xl`}>
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800 bg-white/80 backdrop-blur px-2 py-1 rounded-md mb-1 shadow-sm">Geographic Pulse</h4>
        <p className={`${fullScreen ? 'text-2xl' : 'text-lg'} font-black font-headline text-slate-900 drop-shadow-sm uppercase`}>{city ? `${city} Pulse` : 'WAKE ATLAS'}</p>
      </div>

      <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end gap-2">
        {!fullScreen ? (
          <Link 
            href="/map"
            className="bg-white/80 backdrop-blur p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all group/expand"
          >
            <span className="material-symbols-outlined text-sm">open_in_full</span>
          </Link>
        ) : (
          <div className="flex gap-2 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-xl border border-outline-variant/20">
            <input 
              type="text" 
              placeholder="Enter City..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-slate-900 w-32 px-2"
            />
            <button 
              onClick={handleSetLocation}
              className="bg-primary text-white p-2 rounded-xl"
            >
              <span className="material-symbols-outlined text-sm">my_location</span>
            </button>
          </div>
        )}
      </div>

      <MapContainer 
        center={mapCenter} 
        zoom={city ? 13 : (fullScreen ? 11 : 10)} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={fullScreen}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {myLocation && (
          <Marker 
            position={myLocation}
            icon={L ? L.divIcon({
              className: 'my-location-icon',
              html: `<div class="flex items-center justify-center">
                      <div class="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-2xl"></div>
                      <div class="absolute w-8 h-8 bg-red-600/30 rounded-full animate-ping"></div>
                     </div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            }) : undefined}
          >
            <Popup><span className="text-[10px] font-black uppercase">Your Location</span></Popup>
          </Marker>
        )}

        {eventPositions.map(({ id, position, event }) => {
          const customIcon = L ? L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="flex items-center justify-center cursor-pointer">
                    <span class="material-symbols-outlined text-primary text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-bounce-subtle">location_on</span>
                    <div class="absolute w-4 h-4 bg-primary/20 rounded-full animate-ping"></div>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          }) : undefined;

          return (
            <Marker 
              key={id} 
              position={position}
              icon={customIcon}
              eventHandlers={{
                click: () => router?.push(`/events/${id}`)
              }}
            >
              <Popup className="premium-popup">
                <div className="p-1 max-w-[150px] cursor-pointer" onClick={() => router?.push(`/events/${id}`)}>
                  <h6 className="text-[10px] font-black uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-1 mb-1 hover:text-primary transition-colors">{event.title}</h6>
                  <p className="text-[8px] text-primary font-bold uppercase tracking-widest">{event.municipality} • {event.time || 'All Day'}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[1000] flex gap-2">
        <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[8px] font-bold text-primary shadow-sm uppercase tracking-widest flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          {filteredEvents.length} {city ? `Nearby ${city}` : 'Live Activities'}
        </span>
      </div>
    </div>
  );
}
