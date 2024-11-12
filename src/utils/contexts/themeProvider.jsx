import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "CourtOwner";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "CourtOwner" ? "User" : "CourtOwner"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
