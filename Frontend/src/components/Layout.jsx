import {  Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import React from "react";

export function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/prelogin','/contact-us'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Header />}
      <Outlet />
      
    </>
  );
}
