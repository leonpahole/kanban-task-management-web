import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeModels } from "@/util/theme/theme.models";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode(): void;
}

export const ThemeContext = createContext<ThemeContextType>({} as any);

interface IProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useState<ThemeModels.Theme>(
    ThemeModels.getDefaultTheme()
  );

  const updateTheme = useCallback((toUpdate: Partial<ThemeModels.Theme>) => {
    setTheme((prev) => {
      const updated = {
        ...prev,
        ...toUpdate,
      };

      if (toUpdate.isDarkMode != null) {
        ThemeModels.applyColorModeStyle(toUpdate.isDarkMode);
      }

      ThemeModels.save(updated);
      return updated;
    });
  }, []);

  useEffect(() => {
    updateTheme(ThemeModels.load());
  }, [updateTheme]);

  const toggleDarkMode = useCallback(() => {
    updateTheme({ isDarkMode: !theme.isDarkMode });
  }, [theme.isDarkMode, updateTheme]);

  const value = useMemo(
    (): ThemeContextType => ({
      isDarkMode: theme.isDarkMode,
      toggleDarkMode,
    }),
    [theme.isDarkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};
