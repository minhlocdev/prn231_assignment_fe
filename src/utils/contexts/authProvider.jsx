/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);
  const login = (userData) => {
    setUser(userData);
    if (userData.roleName !== theme) {
      toggleTheme();
    }
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
