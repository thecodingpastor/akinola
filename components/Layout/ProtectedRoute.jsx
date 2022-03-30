import { useEffect, useContext } from "react";
import Router from "next/router";
import AuthContext from "../../context/Auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { IsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!IsLoggedIn) Router.replace("/");
    }, 1);

    return () => clearTimeout(timer);
  }, [IsLoggedIn]);

  return <>{children}</>;
};

export default ProtectedRoute;
