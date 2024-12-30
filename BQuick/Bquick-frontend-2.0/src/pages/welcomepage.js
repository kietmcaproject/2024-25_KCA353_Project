import React, { useState } from 'react';
import OrderManagement from './ordermanagement';  // Adjust path as necessary
import { NavLink } from "react-router-dom";  
import PartyPopers from '../partypopers/party'           

const App = () => {
  // useState hook to track the current screen
  const [hasOrdered, setHasOrdered] = useState(false);

  // Handler for button click to change the state
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300">
      <PartyPopers/>
      {!hasOrdered ? (
        <div className="text-center space-y-8">
          {/* Title */}
          <h1 className="text-7xl font-extrabold text-gray-800 drop-shadow-lg">BQuick</h1>

          {/* Order Button */}
          <NavLink to="/order">
          <button
            className="px-8 py-4 bg-orange-600 text-white text-2xl rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            
          >
            Order
          </button>
          </NavLink>
        </div>
      ) : (
        <OrderManagement hasOrdered={hasOrdered} setHasOrdered={setHasOrdered} />
      )}
    </div>
  );
};

export default App;
