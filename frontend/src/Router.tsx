import { LoginPage } from "./pages";
import { Route } from "react-router";

interface Route {
  path: string;
  element: React.ReactNode;
}

export const protectedRoutes: Route[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];
