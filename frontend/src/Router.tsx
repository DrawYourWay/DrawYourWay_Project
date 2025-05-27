import { Route } from "react-router";
import {
  DrawingBoardPage,
  FeedPage,
  ForgetPasswordPage,
  LoginPage,
  RegisterPage,
  PlacePage,
  NewPlacePage,
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
];

export const protectedRoutes: Route[] = [
  {
    path: "/feed",
    element: <FeedPage />,
  },
  { path: "/draw", element: <DrawingBoardPage /> },
  { path: "/place/:placeId", element: <PlacePage /> },
];

export const adminRoutes: Route[] = [
  {
    path: "/admin/new-place",
    element: <NewPlacePage />,
  },
];
