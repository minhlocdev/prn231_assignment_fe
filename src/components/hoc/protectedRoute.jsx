// ProtectedRoute.js
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../loader/loadingPage";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  const location = useLocation();
  if (loading) return <LoadingPage />;
  if (!user || String(user.roleName).toLowerCase() !== requiredRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};
