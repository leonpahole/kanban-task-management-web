import { PageWrapperId } from "@/pages/_app";

export namespace ThemeModels {
  export interface Theme {
    isDarkMode: boolean;
  }

  const getPageWrapper = () => {
    const pageWrapper = document.getElementById(PageWrapperId);
    if (!pageWrapper) {
      console.warn(`Page wrapper is not defined (id ${PageWrapperId})`);
    }

    return pageWrapper;
  };

  const darkModeClass = "dark";

  export const applyColorModeStyle = (isDarkMode: boolean) => {
    const pageWrapper = getPageWrapper();
    if (isDarkMode) {
      pageWrapper?.classList.add(darkModeClass);
    } else {
      pageWrapper?.classList.remove(darkModeClass);
    }
  };

  export const getDefaultTheme = (): Theme => {
    return {
      isDarkMode: doesUserPreferDarkMode(),
    };
  };

  const doesUserPreferDarkMode = (): boolean => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const ThemeLSKey = "__theme__";

  export const save = (theme: Theme) => {
    localStorage.setItem(ThemeLSKey, JSON.stringify(theme));
  };

  export const load = (): Theme => {
    const defaultTheme = getDefaultTheme();

    try {
      const themeLS = localStorage.getItem(ThemeLSKey);
      if (!themeLS) {
        return defaultTheme;
      }

      const theme = JSON.parse(themeLS) as Theme;

      if (typeof theme.isDarkMode !== "boolean") {
        theme.isDarkMode = defaultTheme.isDarkMode;
      }

      return theme;
    } catch (e) {
      console.warn("load theme error", e);
      return defaultTheme;
    }
  };
}
