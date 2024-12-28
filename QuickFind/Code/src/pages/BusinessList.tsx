import React, { useState, useEffect, useMemo } from 'react';
import { Star, Download, Filter } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';
import SearchInput from '../components/SearchInput';
import LocationSearch from '../components/LocationSearch';

const BusinessList = () => {
  const { businesses, searchBusinesses, exportToExcel } = useBusinessContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);

  // Get unique categories and locations from businesses
  const categories = useMemo(() => 
    Array.from(new Set(businesses.map(b => b.category))).sort(),
    [businesses]
  );

  const locations = useMemo(() => 
    Array.from(new Set(businesses.map(b => b.location))).sort(),
    [businesses]
  );

  // Generate search suggestions based on the current input
  const getSearchSuggestions = (query: string) => {
    if (!query) return [];
    const normalizedQuery = query.toLowerCase();
    const suggestions = new Set<string>();

    businesses.forEach(business => {
      if (business.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(business.name);
      }
      if (business.category.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(business.category);
      }
      if (business.contact.includes(normalizedQuery)) {
        suggestions.add(business.contact);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  };

  const getLocationSuggestions = (query: string) => {
    if (!query) return [];
    const normalizedQuery = query.toLowerCase();
    return locations
      .filter(location => location.toLowerCase().includes(normalizedQuery))
      .slice(0, 5);
  };

  useEffect(() => {
    const results = searchBusinesses(searchQuery, selectedCategory, selectedLocation);
    setFilteredBusinesses(results);
  }, [searchQuery, selectedCategory, selectedLocation, businesses]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Directory</h1>
        <button
          onClick={exportToExcel}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Export to Excel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchInput
            placeholder="Search by name, category, or contact..."
            value={searchQuery}
            onChange={setSearchQuery}
            suggestions={getSearchSuggestions(searchQuery)}
          />

          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <LocationSearch
            value={selectedLocation}
            onChange={setSelectedLocation}
            suggestions={getLocationSuggestions(selectedLocation)}
          />
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Found {filteredBusinesses.length} businesses
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {business.images && business.images[0] && (
              <img
                src={business.images[0]}
                alt={business.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {business.name}
              </h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < business.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {Number(business.rating).toFixed(1)} ({business.reviews} reviews)
                </span>
              </div>
              <p className="text-gray-600 mb-4">{business.description}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <LocationSearch
                  value={business.location}
                  onChange={() => {}}
                  suggestions={[]}
                />
                <span className="line-clamp-1">{business.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {business.category}
                </span>
              </div>
              <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No businesses found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default BusinessList;