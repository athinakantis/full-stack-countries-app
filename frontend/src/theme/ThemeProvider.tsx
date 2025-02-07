import { ReactNode, useState } from "react";
import { theme } from "./theme";
import { ThemeContext } from "./themeContext";

export type Theme = 'light' | 'dark'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  const handleThemeSwitch = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, handleThemeSwitch }}>
        {children}
    </ThemeContext.Provider>
  );
};
