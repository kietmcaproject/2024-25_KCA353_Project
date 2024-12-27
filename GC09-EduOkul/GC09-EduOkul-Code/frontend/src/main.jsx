import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'

export const server = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>
)