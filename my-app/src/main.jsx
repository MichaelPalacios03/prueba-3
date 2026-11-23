import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { TallerProvider } from './context/TallerContext.jsx';

import RegistroTallerPage from './pages/RegistroTallerPage.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/"
  },
  {
    element: <RegistroTallerPage />,
    path: "/registro"
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TallerProvider>
      <RouterProvider router={router} />
    </TallerProvider>
  </StrictMode>,
)
