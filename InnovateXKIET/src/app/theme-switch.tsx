




'use client';


import { Switch } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';
import { MoonIcon } from './MoonIcon'; // Assuming you have this icon component
import { SunIcon } from './SunIcon'; // Assuming you have this icon component

export default function App() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === 'dark';

  const handleChange = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center space-x-4">

      <div className="relative">
        {/* Custom switch track */}
        <div className="relative w-14 h-7 bg-gray-300 rounded-full transition-colors duration-300s ease-in-out">
          {/* Slider knob */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] ${isDarkMode ? 'translate-x-0' : 'translate-x-0'}`}
            style={{ left: isDarkMode ? 'calc(100% - 1.7rem)' : '0' }} // Adjusted left position
          >
            {/* Icon inside the knob */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-250 ease-in-out">
              {isDarkMode ? (
                <SunIcon className="w-4 h-4 text-yellow-500" />
              ) : (
                <MoonIcon className="w-4 h-4 text-gray-600" />
              )}
            </div>
          </div>

          {/* Hidden checkbox to control the switch */}
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

