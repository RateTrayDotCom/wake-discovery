import { MapPin, Clock, Calendar } from "lucide-react";
import type { Event } from "@/constants/mockData";
import Link from "next/link";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <div className="bg-white border rounded-lg overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md hover:border-green-800 h-full flex flex-col">
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded">
              {event.category}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {event.town}
            </span>
          </div>
          <h3 className="text-lg font-serif font-bold mb-3 group-hover:text-green-800 transition-colors line-clamp-2">
            {event.title}
          </h3>
          <div className="mt-auto space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
