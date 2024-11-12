import { useContext } from "react";
import { ThemeContext } from "../utils/contexts/themeProvider";


export const useTheme = () => {
    return useContext(ThemeContext);
};
