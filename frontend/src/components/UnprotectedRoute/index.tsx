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
      await mutateAsync();
    };

    if (AuthService.getToken(AuthService.accessTokenKey)) {
      try {
        checkToken();
        // navigate("/feed");
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        /* empty */
      }
    } else {
      setIsLoading(true);
    }
  }, [isLoading]);

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
