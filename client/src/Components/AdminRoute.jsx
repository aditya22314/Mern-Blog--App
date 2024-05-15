import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom"; //Outlet is used to render the child routes

const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default AdminRoute;
