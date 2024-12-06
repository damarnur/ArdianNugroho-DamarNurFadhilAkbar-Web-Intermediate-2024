'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/theme-context';
import MoonIcon from '@/app/components/Icons/MoonIcon';
import SunIcon from '@/app/components/Icons/SunIcon';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav
      className={`p-4 shadow-md ${isDarkMode ? 'bg-bg-light' : 'bg-white'} transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl font-display font-bold ${isDarkMode ? 'text-accent-blue' : 'text-blue-600'} transition-colors duration-300`}
        >
          MovieSearch
        </Link>
        <div className="flex items-center space-x-4">
          <div className="space-x-4 mr-4">
            <Link
              href="/"
              className={`hover:text-accent-blue transition ${isDarkMode ? 'text-text-primary' : 'text-gray-800'} transition-colors duration-300`}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`hover:text-accent-blue transition ${isDarkMode ? 'text-text-primary' : 'text-gray-800'} transition-colors duration-300`}
            >
              Movies
            </Link>
          </div>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className={`mr-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-blue 
                ${isDarkMode ? 'bg-bg-dark text-text-primary' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded hover:opacity-80 transition 
                ${isDarkMode ? 'bg-accent-blue text-white' : 'bg-blue-500 text-white'} transition-colors duration-300`}
            >
              Search
            </button>
          </form>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-bg-dark' : 'bg-gray-200'} transition-colors duration-300`}
          >
            {isDarkMode ? (
              <SunIcon className="text-text-primary" />
            ) : (
              <MoonIcon className="text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
