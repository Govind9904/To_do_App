import { darkTheme, lightTheme } from "@/theme/colors";
import { ThemeContextType } from "@/types/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");

      if (value !== null) {
        setDarkMode(JSON.parse(value));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTheme = async () => {
    try {
      const value = !darkMode;

      setDarkMode(value);

      await AsyncStorage.setItem("theme", JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);