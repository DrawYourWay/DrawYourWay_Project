import { LoginPage } from "./pages";
import { Route } from "react-router";

interface Route {
  path: string;
  element: React.ReactNode;
}

export const unprotectedRoutes: Route[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export const protectedRoutes: Route[] = [];
