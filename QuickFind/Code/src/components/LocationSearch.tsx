import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import SearchInput from './SearchInput';

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
}

const LocationSearch: React.FC<LocationSearchProps> = ({ value, onChange, suggestions }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          
          // Extract city and state from the response
          const address = data.address;
          const location = [
            address.city || address.town || address.village,
            address.state
          ].filter(Boolean).join(', ');
          
          onChange(location);
        } catch (err) {
          setError('Failed to get location details');
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError('Failed to get your location');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            icon={<MapPin className="h-5 w-5 text-gray-400" />}
            placeholder="Filter by location"
            value={value}
            onChange={onChange}
            suggestions={suggestions}
          />
        </div>
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          title="Use current location"
        >
          <Navigation className="h-5 w-5" />
          {isLoading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <div className="absolute mt-1 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;