import { Route } from "react-router";
import { LoginPage, RegisterPage, FeedPage, ForgetPasswordPage } from "./pages";

interface Route {
  path: string;
  element: React.ReactNode;
}

export const unprotectedRoutes: Route[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage />,
  },
];

export const protectedRoutes: Route[] = [
  {
    path: "/feed",
    element: <FeedPage />,
  },
];
