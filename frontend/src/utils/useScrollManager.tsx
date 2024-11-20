import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions: Record<string, number> = {};

const useScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    if (scrollPositions[pathname] !== undefined) {
      window.scrollTo(0, scrollPositions[pathname]);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      scrollPositions[pathname] = window.scrollY;
    };
  }, [location]);
};

export default useScrollManager;
