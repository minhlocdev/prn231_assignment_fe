import { ConfigProvider } from "antd";
import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
import ThemeProvider from "../../utils/contexts/themeProvider";

const ThemeConfig = ({ children }) => {
  const { theme } = useTheme();
  const themeConfig = {
    CourtOwner: {
      colorPrimary: "#00b96b",
      borderRadius: 2,
      colorTextBase: "#333333",
      colorSuccess: "#66d9a0",
      colorError: "#ff4d4f",
      colorWarning: "#ffeb3b",
    },
    User: {
      colorPrimary: "#4379EE",
      borderRadius: 2,
      colorTextBase: "#333333",
      colorSuccess: "#66d9a0",
      colorError: "#ff4d4f",
      colorWarning: "#ffeb3b",
    },
  };

  const currentTheme = themeConfig[theme];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: currentTheme.colorPrimary,
          borderRadius: currentTheme.borderRadius,
          colorTextBase: currentTheme.colorTextBase,
          colorSuccess: currentTheme.colorSuccess,
          colorError: currentTheme.colorError,
          colorWarning: currentTheme.colorWarning,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

const ThemedApp = ({ children }) => (
  <ThemeProvider>
    <ThemeConfig>{children}</ThemeConfig>
  </ThemeProvider>
);

export default ThemedApp;

ThemedApp.propTypes = {
  children: PropTypes.node.isRequired,
};
ThemeConfig.propTypes = {
  children: PropTypes.node.isRequired,
};
