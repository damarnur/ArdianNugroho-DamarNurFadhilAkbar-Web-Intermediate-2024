'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-bg-dark">
      <div className="text-center">
        <h1 className="text-5xl font-display font-bold mb-6 text-accent-blue">
          Movie Search
        </h1>
        <form onSubmit={handleSearch} className="flex max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full p-3 bg-bg-light text-text-primary rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
          />
          <button
            type="submit"
            className="bg-accent-blue text-white px-6 rounded-r-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
