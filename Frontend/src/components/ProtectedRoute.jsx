import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utility/auth';

const ProtectedRoute = ({ children }) => {
  const token = isAuthenticated();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

 
  return children ? children : <Outlet />;
};

export default ProtectedRoute;