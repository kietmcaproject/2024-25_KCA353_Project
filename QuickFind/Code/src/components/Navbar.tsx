import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900">QuickFind</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search businesses..."
                className="w-96 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/add-business"
              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              Add Business
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;