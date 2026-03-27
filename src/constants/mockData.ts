export type NewsStory = {
  id: string;
  town: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readingTime: string;
  image: string;
};

export type WakeEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  municipality: string;
  description: string;
  imageURL: string;
  sourceUrl?: string;
  kidFriendly?: boolean;
};

export type Event = WakeEvent & { town: string; category: string; image: string; }; // For backward compatibility if needed

export const TOWNS = ['Raleigh', 'Cary', 'Apex', 'Holly Springs', 'Wake Forest', 'Morrisville', 'Knightdale', 'Garner', 'Fuquay-Varina', 'Rolesville', 'Zebulon', 'Wendell'];

export const MOCK_NEWS: NewsStory[] = [
  {
    id: '1',
    town: 'Raleigh',
    category: 'Environment',
    title: 'The Ghost Forests of the Atlantic Coast',
    excerpt: 'Vast stands of dead cedars and pines are appearing along the coastline, creating eerie landscapes.',
    author: 'Elena Vance',
    date: 'Oct 24, 2025',
    readingTime: '8 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSs_tN-TtJSJDEwanA8dWoz4_2sjNdNt66-eRMFy1xjj9X7Xls5g4Z9aGuQ6oTberRDPmAXLGOxq588KsOb8EOet29c45JkUA28kRFizg64PXhdFCcv35QtrPZ_oyfraS9ZS_bz2udImyQc4qUlYh8_CLVYp6G9UpEav-h05nFdShamM9I3niLzEsCH1jKUFfVYT2KJmVT3GzLQTBPjk6JebRrkJlc7VktoTQe_cJS9v4yLopDZiOHri7r07m51ncxjrYl8NXefk'
  },
  {
    id: '2',
    town: 'Cary',
    category: 'Architecture',
    title: 'Rethinking Verticality: Urban Forest Towers',
    excerpt: 'Discover how emerging urban designers are integrating living ecosystems into high-density housing.',
    author: 'Julian Thorne',
    date: 'Oct 23, 2025',
    readingTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQbxhJSedy7JT-zPCUg9-1dfhk_SLtMxZo3QgFVR1onVCgIyJWhIegqWWU_f7sKoCK5iIvcg9vVd1tHn-mtni6Hr9lOfSo3lfi_OxiYfHPEBZxesnahPI5g3oNSnuawS7RDbuwuF7IrCrdLFQasMCYmkh99wve7knkjmRq_HvmRhSKDukyZU7FG0JhPFg_61kp8IBEWTVe-Wn3V75DXW_laXsszRJr0L3nnp2hBIW5gajx2IrKDRqNG454PkfS2voOMDlqi2qKEog'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    town: 'Raleigh',
    municipality: 'Raleigh',
    category: 'Music',
    title: 'The Midnight Echoes Live',
    date: 'Oct 14, 2025',
    time: '8:00 PM',
    location: 'The Electric Lounge',
    description: 'A night of immersive indie rock and digital soundscapes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA73k68uCSz64DkcyAgxbG7dzcKu_qa0nGMUKmZK0bqX1dMBBpz1I9QjSMjzcrzswoqEK08QwZxIJrOe3tyBG7og1uRp09FwMG6OigpLYsqTNmsr3R6Z1QwA8dcZJhVy2iIhOMpUmtyv7SfivhTX4mPSFX3w5V2rOGC6isNK-kzYOmIcZv-nHM_677D8vtck8hV7cequcWclztr9vAC8J3Uy12noNb3fN2rauOqQDbdsujHZrMQyuJeRlxmN82AeCXlTjEbV4fvDoA',
    imageURL: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA73k68uCSz64DkcyAgxbG7dzcKu_qa0nGMUKmZK0bqX1dMBBpz1I9QjSMjzcrzswoqEK08QwZxIJrOe3tyBG7og1uRp09FwMG6OigpLYsqTNmsr3R6Z1QwA8dcZJhVy2iIhOMpUmtyv7SfivhTX4mPSFX3w5V2rOGC6isNK-kzYOmIcZv-nHM_677D8vtck8hV7cequcWclztr9vAC8J3Uy12noNb3fN2rauOqQDbdsujHZrMQyuJeRlxmN82AeCXlTjEbV4fvDoA'
  }
];
