import { Navigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated, checkAuth } = useAuth();

   useEffect(() => {
    // Hanya refresh jika belum authenticated
    if (!isAuthenticated && !isLoading) {
      checkAuth(true);
    }
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;