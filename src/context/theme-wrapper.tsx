'use client';

import { useTheme } from '@/context/theme-context';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-bg-dark text-white' : 'bg-[#eeebe3] text-black'
      } transition-colors duration-300`}
    >
      {children}
    </div>
  );
}
