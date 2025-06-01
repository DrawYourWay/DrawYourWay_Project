import { useRefresh, useVerify } from "@/hooks/useAuth";
import AuthService from "@/services/TokenService";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TransitionLoader from "../TransitionLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: verifyToken } = useVerify();
  const { mutateAsync: refreshToken } = useRefresh();
  const navigate = useNavigate();

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    const initAuth = async () => {
      const token = AuthService.getToken(AuthService.accessTokenKey),
        renewToken = AuthService.getToken(AuthService.refreshTokenKey);

      if (!token && !renewToken) {
        setIsLoading(false);
        navigate("/login");
        return;
      } else if (renewToken && !token) {
        try {
          await refreshToken();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          console.warn("Token refresh failed, redirecting to login");
          setIsLoading(false);
          navigate("/login");
        }
      }

      try {
        await verifyToken();
        setIsLoading(false);

        refreshInterval = setInterval(async () => {
          try {
            await refreshToken();
          } catch (e) {
            console.warn("Token refresh failed", e);
            clearInterval(refreshInterval);
            navigate("/login");
          }
        }, 60_000);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setIsLoading(false);
        navigate("/login");
      }
    };

    initAuth();

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [navigate, verifyToken, refreshToken]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <TransitionLoader key="loader" />}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
};

export default ProtectedRoute;
