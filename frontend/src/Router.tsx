import { Route } from "react-router";
import {
  AllPlacesPage,
  DrawingBoardPage,
  // FeedPage,
  ForgetPasswordPage,
  LoginPage,
  NewPlacePage,
  PlacePage,
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
];

export const protectedRoutes: Route[] = [
  // {
  //   path: "/feed",
  //   element: <FeedPage />,
  // },
  {
    path: "/places",
    element: <AllPlacesPage />,
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
