import { NavbarLogo } from "@/components/layout/Navbar/NavbarLogo";
import { BoardQueries } from "@/util/board/board.queries";
import { NavbarAddTask } from "@/components/layout/Navbar/NavbarAddTask";
import { NavbarBoardMenu } from "@/components/layout/Navbar/NavbarBoardMenu";

export const Navbar = () => {
  const { data: selectedBoard } = BoardQueries.useSelectedBoard();

  return (
    <header className="flex items-center bg-white dark:bg-gray-dark">
      <NavbarLogo />

      <div className="w-px self-stretch bg-lines-light dark:bg-lines-dark" />

      <div className="flex-1">
        <div className="flex flex-1 items-center justify-between px-6 pt-5 pb-7">
          <h1 className="mb-1 text-hxl text-black dark:text-white">
            {selectedBoard?.name || ""}
          </h1>
          <div className="flex gap-4">
            <NavbarAddTask board={selectedBoard} />
            <NavbarBoardMenu board={selectedBoard} />
          </div>
        </div>
        <div className="h-px bg-lines-light dark:bg-lines-dark" />
      </div>
    </header>
  );
};
