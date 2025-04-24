import { Toaster } from "./components/ui/toaster";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import UnprotectedRoute from "./components/ProtectedRoute";
import { unprotectedRoutes } from "./Router";
import theme from "./theme/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={theme}>
        <BrowserRouter>
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
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
