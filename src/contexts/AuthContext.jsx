import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../controllers/AuthController';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async (forceRefresh = false) => {
    // Cek cache di sessionStorage jika tidak force refresh
    if (!forceRefresh) {
      const cachedUser = sessionStorage.getItem('user');
      const cachedExpiry = sessionStorage.getItem('userExpiry');
      
      if (cachedUser && cachedExpiry) {
        const now = new Date().getTime();
        if (now < parseInt(cachedExpiry)) {
          // Cache masih valid
          setUser(JSON.parse(cachedUser));
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      }
    }

    // Jika tidak ada cache atau expired, fetch dari API
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      
      // Simpan ke sessionStorage dengan expiry 15 menit
      sessionStorage.setItem('user', JSON.stringify(userData));
      const expiry = new Date().getTime() + (15 * 60 * 1000); // 15 menit
      sessionStorage.setItem('userExpiry', expiry.toString());
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userExpiry');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userExpiry');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated, 
      checkAuth,
      setUser,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};