import { NavbarLogo } from "@/components/layout/Navbar/NavbarLogo";
import { BoardQueries } from "@/util/board/board.queries";
import { NavbarAddTask } from "@/components/layout/Navbar/NavbarAddTask";
import { NavbarBoardMenu } from "@/components/layout/Navbar/NavbarBoardMenu";
import { NavbarBoardName } from "@/components/layout/Navbar/NavbarBoardName";
import { withClientOnly } from "@/components/shared/withClientOnly";

export const Navbar = withClientOnly(() => {
  const { data: selectedBoard } = BoardQueries.useSelectedBoard();

  return (
    <header className="flex items-center bg-white py-4 pl-4 pr-0 dark:bg-gray-dark md:py-0 md:pl-0 md:pr-0">
      <NavbarLogo />

      <div className="hidden w-px self-stretch bg-lines-light dark:bg-lines-dark md:block" />

      <div className="flex-1">
        <div className="flex flex-1 items-center justify-between gap-3 md:px-6 md:pt-4 md:pb-4 lg:pt-5 lg:pb-7">
          <NavbarBoardName board={selectedBoard} />
          <div className="flex flex-shrink-0 gap-2 md:gap-4">
            <NavbarAddTask board={selectedBoard} />
            <NavbarBoardMenu board={selectedBoard} />
          </div>
        </div>
        <div className="hidden h-px bg-lines-light dark:bg-lines-dark md:block" />
      </div>
    </header>
  );
});
