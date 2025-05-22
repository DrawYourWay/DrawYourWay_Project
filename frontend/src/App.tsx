import { Route, Routes } from "react-router";
import { ProtectedRoute, UnprotectedRoute } from "./components";
import { Toaster } from "./components/ui/toaster";
import Providers from "./Providers";
import { protectedRoutes, unprotectedRoutes } from "./Router";
import { Navigate } from "react-router";

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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Providers>
  );
}

export default App;
