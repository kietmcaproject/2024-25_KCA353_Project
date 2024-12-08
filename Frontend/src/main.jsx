import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Prelogin from './components/Prelogin.jsx';
import ProductCard from './components/ProductCard.jsx';
import Profile from './components/Profile.jsx';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoutes.jsx';
import AllCustomers from './components/Admin/AllCustomers.jsx'
import AcceptedOrders from './components/Admin/AcceptedOrders.jsx'
import PendingOrders from './components/Admin/PendingOrders.jsx'
import RejectedOrders from './components/Admin/RejectedOrders.jsx'
import AddProduct from './components/Authority/AddProduct.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import ContactUs from './components/Contact-Us.jsx';
import OrderSummary from './components/OrderSummary.jsx';
import CategorizedProducts from './components/CategorizedProducts.jsx';
import PDFViewer from './components/PDF.jsx';
import Orders from './components/Orders.jsx';
import ProductGridAuth from './components/Authority/ProductGridAuth.jsx';
import SearchBar from './components/SearchBar.jsx';
import { ChakraProvider } from '@chakra-ui/react';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="product/:id" element={<ProductCard />} />
      <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="" element={<App />}  />
      <Route path="cart" element={<ProtectedRoute element={<Cart />} />} />
      <Route path="catelog"  element={<PDFViewer />}  />
      <Route path="orders" element={<ProtectedRoute element={<Orders />} />} />
      <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="order-summary" element={<ProtectedRoute element={<OrderSummary />} />} />
      <Route path="search" element={<SearchBar />}  />
      <Route path="category-grid/:category" element={<CategorizedProducts />} />
      <Route path="login" element={<Login />} />
      <Route path='contact-us' element = {<ContactUs/>}/>
      <Route path="register" element={<Register />} />
      <Route path="prelogin" element={<Prelogin />} />
      <Route path="admin-dashboard" element={
      <RoleBasedRoute allowedRoles={'admin'}>
        < AdminDashboard/> {/* This route is only accessible by admins */}
      </RoleBasedRoute>
      } />
      
      <Route path="customers" element={
      <RoleBasedRoute allowedRoles={['admin']}>
        <AllCustomers /> {/* This route is only accessible by admins */}
      </RoleBasedRoute>
      } />
      <Route path="accepted-orders" element={
      <RoleBasedRoute allowedRoles={['admin']}>
        <AcceptedOrders /> {/* This route is only accessible by admins */}
      </RoleBasedRoute>
      } />
      <Route path="edit-products" element={
      <RoleBasedRoute allowedRoles={['admin']}>
        <ProductGridAuth /> {/* This route is only accessible by admins */}
      </RoleBasedRoute>
      } />
      
      <Route path="pending-orders" element={
      <RoleBasedRoute allowedRoles={['admin']}>
        <PendingOrders /> {/* This route is only accessible by admins */}
      </RoleBasedRoute>
      } />
       <Route path="rejected-orders" element={
      <RoleBasedRoute allowedRoles={['admin']}>
        <RejectedOrders /> {/* This route is only accessible by admins */}
      </RoleBasedRoute>
      } />
      

      

    <Route path="addproduct" element={
      <RoleBasedRoute allowedRoles={['admin', 'employee']}>
      <AddProduct /> 
    </RoleBasedRoute>
    } />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ChakraProvider>
  <RouterProvider router={router} />
  </ChakraProvider>
  // </React.StrictMode>,
);
