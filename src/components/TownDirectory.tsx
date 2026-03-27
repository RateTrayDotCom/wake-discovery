import Link from "next/link";
import { TOWNS } from "@/constants/mockData";
import { ChevronRight } from "lucide-react";

export default function TownDirectory() {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b pb-2">
        Town Directory
      </h3>
      <nav className="flex flex-col space-y-1">
        {TOWNS.map(town => {
           const townSlug = town.toLowerCase().replace(/ /g, "-");
           return (
            <Link
              key={town}
              href={`/news/${townSlug}`}
              className="group flex items-center justify-between py-2 text-sm text-gray-600 hover:text-green-800 hover:bg-green-50 rounded-md px-2 transition-colors"
            >
              <span className="font-medium">{town}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-800 transition-colors" />
            </Link>
           );
        })}
      </nav>
    </div>
  );
}
