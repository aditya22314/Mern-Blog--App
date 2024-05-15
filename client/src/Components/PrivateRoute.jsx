import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom"; //Outlet is used to render the child routes

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};



export default PrivateRoute;
