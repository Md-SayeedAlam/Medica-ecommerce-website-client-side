import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {HelmetProvider } from 'react-helmet-async';

import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <div className='container mx-auto'>
    <RouterProvider router={router} />
    </div>
    </HelmetProvider>
  </StrictMode>,
)
