import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './style/index.css'
import AppContextExports from './context/context.tsx'

const {AppProvider} = AppContextExports;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_METADATA_GOOGLE_CLIENT_ID}>
      <React.StrictMode>
          <AppProvider>
              <App />
          </AppProvider>
      </React.StrictMode>
  </GoogleOAuthProvider>
)
