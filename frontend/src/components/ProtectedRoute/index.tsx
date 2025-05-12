import { useVerify } from "@/hooks/useAuth";
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
  const { mutateAsync } = useVerify();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await mutateAsync();
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setIsLoading(false);
        navigate("/login");
      }
    };

    if (AuthService.getToken(AuthService.accessTokenKey)) {
      checkToken();
    } else {
      setIsLoading(false);
      navigate("/login");
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

export default ProtectedRoute;
