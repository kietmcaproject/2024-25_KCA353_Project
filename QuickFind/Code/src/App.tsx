import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BusinessList from './pages/BusinessList';
import AddBusiness from './pages/AddBusiness';
import Login from './pages/Login';
import { BusinessProvider } from './context/BusinessContext';

function App() {
  return (
    <BusinessProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/businesses" element={<BusinessList />} />
            <Route path="/add-business" element={<AddBusiness />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BusinessProvider>
  );
}

export default App;