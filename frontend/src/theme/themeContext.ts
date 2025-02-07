import { createContext } from 'react';
import { Theme } from './ThemeProvider';

interface ThemeContextProps {
    currentTheme: Theme;
    handleThemeSwitch: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    currentTheme: 'dark',
    handleThemeSwitch: () => {},
});
