import { Route } from "react-router";
import {
  DrawingBoardPage,
  FeedPage,
  ForgetPasswordPage,
  LoginPage,
  RegisterPage,
} from "./pages";

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
  { path: "/draw", element: <DrawingBoardPage /> },
];

export const protectedRoutes: Route[] = [
  {
    path: "/feed",
    element: <FeedPage />,
  },
];
