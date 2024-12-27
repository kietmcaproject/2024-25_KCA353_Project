import React from 'react'
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Jugaadrequest from './pages/jugaadRequestPage/jugaadRequest';
import Home from './pages/home/home';
import Signup from './pages/signup/signup';
import Profile from './pages/profile/profile';
import Chat from './pages/chat/chat';
import About from './pages/aboutUs/about';
import AddRequestModel from './components/AddRequest/AddRequestModel';
import Footer from './components/Footer/Footer';
import WhyUs from './pages/whyUs/why-us';
import LoginPage from './pages/login/login';
import LogoutPage from './pages/logout/logout';

const App = () => {

  const pathname = window.location.pathname;

  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='*' element={<Home path={pathname} />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/why-us' element={<WhyUs />} />
          <Route path='/about' element={<About />} />
          <Route path='/jugaad-req/:id' element={<Jugaadrequest />} />
          <Route path='/short/:id' element={<Jugaadrequest />} />
          <Route path='/addRequest' element={<AddRequestModel />} />
          <Route path='/logout' element={<LogoutPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;