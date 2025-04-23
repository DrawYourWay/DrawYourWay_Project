import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import UnprotectedRoute from "./components/ProtectedRoute";
import { Provider } from "./components/ui/provider";
import { protectedRoutes } from "./Router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <BrowserRouter>
          <Routes>
            {protectedRoutes.map((route) => (
              <Route
                path={route.path}
                element={<UnprotectedRoute>{route.element}</UnprotectedRoute>}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
