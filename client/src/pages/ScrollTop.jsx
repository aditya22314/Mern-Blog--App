import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathName } = useLocation(); // pathname search hash key
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);
  return null;
};

export default ScrollTop;
