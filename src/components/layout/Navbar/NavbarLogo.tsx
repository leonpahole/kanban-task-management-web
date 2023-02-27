import { withClientOnly } from "@/components/shared/withClientOnly";
import { useLayout } from "@/providers/LayoutContext";
import { useTheme } from "@/providers/ThemeContext";
import Image from "next/image";
import LogoDark from "public/images/logo-dark.svg";
import LogoLight from "public/images/logo-light.svg";
import LogoMobile from "public/images/logo-mobile.svg";

export const NavbarLogo = withClientOnly(() => {
  const { isDarkMode } = useTheme();
  const { isSidebarOpen } = useLayout();

  return (
    <div className="flex flex-shrink-0 flex-col justify-end md:w-65 md:self-stretch lg:w-75">
      <Image
        src={isDarkMode ? LogoLight : LogoDark}
        alt=""
        className="mb-5 ml-6 mr-4 mt-4 hidden md:block lg:mb-9"
      />
      <Image src={LogoMobile} alt="" className="mr-4 block md:hidden" />
      <div
        className={`hidden h-px bg-lines-light dark:bg-lines-dark md:block ${
          isSidebarOpen ? "invisible" : ""
        }`}
      />
    </div>
  );
});
