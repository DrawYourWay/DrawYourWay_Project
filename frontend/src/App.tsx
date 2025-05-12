<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Feed from './pages/dashboard/Feed/index.tsx'
import './App.css'
import { Route } from 'react-router-dom'

<Route path="/feed" element={<Feed />} />
=======
import { Route, Routes } from "react-router";
import { ProtectedRoute, UnprotectedRoute } from "./components";
import { Toaster } from "./components/ui/toaster";
import Providers from "./Providers";
import { protectedRoutes, unprotectedRoutes } from "./Router";
>>>>>>> main

function App() {
  return (
    <Providers>
      <Routes>
        {unprotectedRoutes.map((route) => (
          <Route
            path={route.path}
            element={
              <UnprotectedRoute>
                <Toaster />
                {route.element}
              </UnprotectedRoute>
            }
          />
        ))}
        {protectedRoutes.map((route) => (
          <Route
            path={route.path}
            element={
              <ProtectedRoute>
                <Toaster />
                {route.element}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </Providers>
  );
}

export default App;
