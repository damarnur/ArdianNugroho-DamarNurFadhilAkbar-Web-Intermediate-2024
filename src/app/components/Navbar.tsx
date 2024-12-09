'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/theme-context';
import MoonIcon from '@/app/components/Icons/MoonIcon';
import SunIcon from '@/app/components/Icons/SunIcon';
import MenuIcon from '@/app/components/Icons/MenuIcon';
import CloseIcon from '@/app/components/Icons/CloseIcon';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies?query=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`p-4 shadow-md ${isDarkMode ? 'bg-bg-light' : 'bg-white'} transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-display font-bold ${isDarkMode ? 'text-accent-blue' : 'text-blue-600'} transition-colors duration-300`}
        >
          MovieSearch
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden p-2 rounded-full ${isDarkMode ? 'text-text-primary' : 'text-gray-800'}`}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
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
              <MoonIcon className="text-text-primary" />
            ) : (
              <SunIcon className=" text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            className={`absolute top-full left-0 right-0 md:hidden mt-4 p-4 shadow-lg 
            ${isDarkMode ? 'bg-bg-light' : 'bg-white'} z-50`}
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`hover:text-accent-blue transition ${isDarkMode ? 'text-text-primary' : 'text-gray-800'} transition-colors duration-300`}
              >
                Home
              </Link>
              <Link
                href="/movies"
                onClick={closeMobileMenu}
                className={`hover:text-accent-blue transition ${isDarkMode ? 'text-text-primary' : 'text-gray-800'} transition-colors duration-300`}
              >
                Movies
              </Link>
              <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-blue 
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
              <div className="flex justify-between items-center">
                <span className={`${isDarkMode ? 'text-text-primary' : 'text-gray-800'}`}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
