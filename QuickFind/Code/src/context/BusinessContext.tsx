import React, { createContext, useContext, useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Business } from '../types/business';
import { initialBusinesses } from '../data/initialBusinesses';
import { calculateDistance } from '../utils/distance';

interface BusinessContextType {
  businesses: Business[];
  addBusiness: (business: Omit<Business, 'id'>) => void;
  exportToExcel: () => void;
  searchBusinesses: (query: string, category?: string, location?: string) => Business[];
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<{latitude: number; longitude: number} | null>(null);

  useEffect(() => {
    // Get user's location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          console.log('Unable to retrieve your location');
        }
      );
    }

    const savedBusinesses = localStorage.getItem('businesses');
    if (savedBusinesses) {
      setBusinesses(JSON.parse(savedBusinesses));
    } else {
      const initialData = initialBusinesses.map(business => ({
        ...business,
        id: Math.random().toString(36).substr(2, 9)
      }));
      setBusinesses(initialData);
      localStorage.setItem('businesses', JSON.stringify(initialData));
    }
  }, []);

  const addBusiness = (business: Omit<Business, 'id'>) => {
    const newBusiness = {
      ...business,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updatedBusinesses = [...businesses, newBusiness];
    setBusinesses(updatedBusinesses);
    localStorage.setItem('businesses', JSON.stringify(updatedBusinesses));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(businesses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Muradnagar Businesses');
    XLSX.writeFile(wb, 'muradnagar_businesses.xlsx');
  };

  const normalizeString = (str: string) => {
    return str.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const searchBusinesses = (query: string, category?: string, location?: string) => {
    const searchQuery = normalizeString(query);
    const searchLocation = location ? normalizeString(location) : '';
    
    let results = businesses.filter((business) => {
      // For the main search query
      const matchesQuery = searchQuery === '' || [
        business.name,
        business.description,
        business.category,
        business.location,
        business.contact,
        business.email
      ].some(field => normalizeString(field).includes(searchQuery));

      // For category
      const matchesCategory = !category || category === '' || 
        normalizeString(business.category) === normalizeString(category);

      // For location - more flexible matching
      const matchesLocation = !searchLocation || 
        normalizeString(business.location).includes(searchLocation) ||
        searchLocation.split(' ').every(term => 
          normalizeString(business.location).includes(normalizeString(term))
        );

      return matchesQuery && matchesCategory && matchesLocation;
    });

    // Sort by distance if user coordinates are available
    if (userCoordinates && results.length > 0) {
      results = results.sort((a, b) => {
        if (!a.coordinates || !b.coordinates) return 0;
        
        const distanceA = calculateDistance(
          userCoordinates.latitude,
          userCoordinates.longitude,
          a.coordinates.latitude,
          a.coordinates.longitude
        );
        
        const distanceB = calculateDistance(
          userCoordinates.latitude,
          userCoordinates.longitude,
          b.coordinates.latitude,
          b.coordinates.longitude
        );
        
        return distanceA - distanceB;
      });
    }

    return results;
  };

  return (
    <BusinessContext.Provider value={{ businesses, addBusiness, exportToExcel, searchBusinesses }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};