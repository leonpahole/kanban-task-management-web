import { withClientOnly } from "@/components/shared/withClientOnly";
import { useLayout } from "@/providers/LayoutContext";
import { useTheme } from "@/providers/ThemeContext";
import Image from "next/image";
import LogoDark from "public/images/logo-dark.svg";
import LogoLight from "public/images/logo-light.svg";

export const NavbarLogo = withClientOnly(() => {
  const { isDarkMode } = useTheme();
  const { isSidebarOpen } = useLayout();

  return (
    <div className="flex w-75 flex-col justify-end self-stretch">
      <Image
        src={isDarkMode ? LogoLight : LogoDark}
        alt=""
        width="152"
        height="25"
        className="mb-9 ml-6 mr-4 mt-4"
      />
      <div
        className={`h-px bg-lines-light dark:bg-lines-dark ${
          isSidebarOpen ? "invisible" : ""
        }`}
      />
    </div>
  );
});
