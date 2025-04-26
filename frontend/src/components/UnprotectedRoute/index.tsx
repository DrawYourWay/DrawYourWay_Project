import { useVerify } from "@/hooks/useAuth";
import AuthService from "@/services/TokenService";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import TransitionLoader from "../TransitionLoader";
import { useNavigate } from "react-router";

interface UnprotectedRouteProps {
  children: React.ReactNode;
}

const UnprotectedRoute = ({ children }: UnprotectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync } = useVerify();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await mutateAsync();
        navigate("/feed");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        // Jeśli token jest niepoprawny, pokaż dzieci (np. stronę logowania)
        setIsLoading(false);
      }
    };

    if (AuthService.getToken(AuthService.accessTokenKey)) {
      checkToken();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <TransitionLoader key="loader" />}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
};

export default UnprotectedRoute;
