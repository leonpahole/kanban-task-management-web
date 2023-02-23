import { BoardList } from "@/components/layout/Sidebar/BoardList/BoardList";
import { ColorSchemeSwitcher } from "@/components/layout/Sidebar/ColorSchemeSwitcher";
import { HideSidebarButton } from "@/components/layout/Sidebar/HideSidebarButton";
import { ShowSidebarButton } from "@/components/layout/Sidebar/ShowsidebarButton";
import { useTheme } from "@/providers/ThemeContext";
import { BoardModels } from "@/util/board/board.models";
import Image from "next/image";
import LogoDark from "public/images/logo-dark.svg";
import LogoLight from "public/images/logo-light.svg";
import { useState } from "react";

interface IProps {
  boards: BoardModels.Board[];
}

export const Sidebar = ({ boards }: IProps) => {
  const { isDarkMode } = useTheme();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  return (
    <aside
      className={`flex w-75 flex-col justify-between bg-white transition-spacing dark:bg-gray-dark ${
        isOpen ? "" : "-ml-75"
      }`}
      aria-hidden={!isOpen}
    >
      <div>
        <Image
          src={isDarkMode ? LogoLight : LogoDark}
          alt=""
          width="152"
          height="25"
          className="mx-8.5 mt-8 mb-13.5"
        />
        <BoardList boards={boards} />
      </div>
      <div className="mb-8 flex flex-col gap-2">
        <ColorSchemeSwitcher />
        <HideSidebarButton onClick={hide} />
      </div>
      <ShowSidebarButton isVisible={!isOpen} onClick={show} />
    </aside>
  );
};
