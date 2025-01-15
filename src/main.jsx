import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {HelmetProvider } from 'react-helmet-async';

import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Hookos/AuthProvider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <HelmetProvider>
    <div className='container mx-auto'>
    <RouterProvider router={router} />
    </div>
    </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
