import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Auth0Provider } from "@auth0/auth0-react"
import { MantineProvider } from '@mantine/core'; // Import MantineProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-sma7reoctm83q6qn.us.auth0.com'
      clientId='GnsU5LTNzAnnh5DOarln6gzfoyo8Ohpm'
      authorizationParams={{
        redirect_uri: "http://localhost:5173"
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
)
