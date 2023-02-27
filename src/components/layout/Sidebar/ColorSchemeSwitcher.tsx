import { useTheme } from "@/providers/ThemeContext";
import { withClientOnly } from "@/components/shared/withClientOnly";
import Image from "next/image";

import IconDarkTheme from "public/images/icon-dark-theme.svg";
import IconLightTheme from "public/images/icon-light-theme.svg";

import { AppToggle } from "@/components/shared/AppToggle";

export const ColorSchemeSwitcher = withClientOnly(() => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="mx-4 flex items-center justify-center rounded-md bg-gray-light py-3.5 px-2 dark:bg-gray-very-dark md:mx-6">
      <AppToggle
        isChecked={isDarkMode}
        onToggle={toggleDarkMode}
        labelClassName="gap-6"
        labelLeft={<Image src={IconLightTheme} alt="" width="18" height="18" />}
        labelRight={<Image src={IconDarkTheme} alt="" width="18" height="18" />}
      />
    </div>
  );
});
