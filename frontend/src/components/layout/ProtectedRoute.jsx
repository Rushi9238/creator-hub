import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
   if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the route has children (e.g. <Layout>), render it directly
  // Otherwise, render nested routes through <Outlet />
  return children ? children : <Outlet />;
};

export default ProtectedRoute;