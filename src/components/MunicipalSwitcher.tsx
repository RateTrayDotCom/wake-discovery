"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOWNS } from "@/constants/mockData";

export default function MunicipalSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
      <Link 
        href="/" 
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          pathname === "/" 
            ? "bg-green-800 text-white" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All of Wake County
      </Link>
      {TOWNS.map(town => {
        const townSlug = town.toLowerCase().replace(/ /g, "-");
        const isActive = pathname.includes(`/news/${townSlug}`);
        
        return (
          <Link 
            key={town}
            href={`/news/${townSlug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive 
                ? "bg-green-800 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {town}
          </Link>
        );
      })}
    </div>
  );
}
