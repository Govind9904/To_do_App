import { Theme } from "./theme";

export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
};
