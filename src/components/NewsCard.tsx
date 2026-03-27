import type { NewsStory } from "@/constants/mockData";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function NewsCard({ story, featured }: { story: NewsStory, featured?: boolean }) {
  return (
    <Link href={`/news/${story.town.toLowerCase().replace(/ /g, "-")}`} className="group block h-full">
      <article className={`bg-white border hover:border-green-800 rounded-lg overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md ${featured ? 'md:flex' : 'flex flex-col h-full'}`}>
        <div className={`p-6 flex flex-col ${featured ? 'md:w-full' : 'flex-1'}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded">
              {story.category}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {story.town}
            </span>
          </div>
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-serif font-bold mb-3 group-hover:text-green-800 transition-colors`}>
            {story.title}
          </h3>
          <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
            {story.excerpt}
          </p>
          <div className="mt-auto flex justify-between items-center text-xs text-gray-500 border-t pt-4">
            <span className="font-medium text-gray-700">By {story.author}</span>
            <div className="flex items-center gap-3">
              <span>{new Date(story.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{story.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
