import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import TransitionLoader from "../TransitionLoader";

interface UnprotectedRouteProps {
  children: React.ReactNode;
}

const UnprotectedRoute = ({ children }: UnprotectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
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
