import { NavbarMobileBoardMenu } from "@/components/layout/Navbar/NavbarMobileBoardMenu";
import { AppMenu } from "@/components/shared/AppMenu";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { BoardModels } from "@/util/board/board.models";
import Image from "next/image";
import IconChevronDown from "public/images/icon-chevron-down.svg";
import { useState } from "react";

const headingClasses =
  "lg:mb-1 truncate text-hl md:text-hxl-t text-black dark:text-white lg:text-hxl";

interface IProps {
  board: BoardModels.Board | undefined;
}

export const NavbarBoardName = ({ board }: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { isMd } = useBreakpoint("md");

  return (
    <>
      <h1 className={`${headingClasses} hidden md:block`}>
        {board?.name || ""}
      </h1>

      {!isMd && (
        <AppMenu
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          buttonContent={
            <div className="flex items-center gap-2">
              <h1 className={headingClasses}>
                {board?.name || "Select board"}
              </h1>
              <Image src={IconChevronDown} alt="" width="8" height="4" />
            </div>
          }
          menuContent={
            <NavbarMobileBoardMenu onModalOpen={() => setIsMenuOpen(false)} />
          }
          offset={[0, 36]}
          menuClassName="!max-w-none !py-4 !px-0 !w-auto"
        />
      )}
    </>
  );
};
