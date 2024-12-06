'use client';

import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContexts';
import MoonIcons from '@/app/components/Icons/MoonIcons';
import SunIcons from '@/app/components/Icons/SunIcons';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 shadow-md ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-bg-light text-black'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-display font-bold text-accent-blue">
          MovieSearch
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-accent-blue transition">
            Home
          </Link>
          <Link href="/movies" className="hover:text-accent-blue transition">
            Movies
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <SunIcons /> : <MoonIcons />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
