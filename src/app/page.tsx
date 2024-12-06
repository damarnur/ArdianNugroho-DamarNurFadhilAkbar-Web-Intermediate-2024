// src/app/page.tsx
'use client';

import { useTheme } from '@/context/theme-context';

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center ${isDarkMode ? 'bg-bg-dark' : 'bg-[#eeebe3]'}`}
    ></div>
  );
}
