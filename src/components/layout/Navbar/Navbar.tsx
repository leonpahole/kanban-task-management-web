import { NavbarLogo } from "@/components/layout/Navbar/NavbarLogo";
import { BoardQueries } from "@/util/board/board.queries";
import { AppButton } from "@/components/shared/AppButton";
import { AddTaskModal } from "@/components/board/task/AddTaskModal";
import { useState } from "react";

export const Navbar = () => {
  const { data: selectedBoard } = BoardQueries.useSelectedBoard();

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="flex items-center bg-white dark:bg-gray-dark">
        <NavbarLogo />

        <div className="w-px self-stretch bg-lines-light dark:bg-lines-dark" />

        <div className="flex-1">
          <div className="flex flex-1 items-center justify-between px-6 pt-5 pb-7">
            <h1 className="mb-1 text-hxl text-black dark:text-white">
              {selectedBoard?.name || ""}
            </h1>
            <div className="flex ">
              <AppButton
                disabled={
                  selectedBoard == null || selectedBoard.columns.length === 0
                }
                onClick={() => {
                  setIsAddTaskModalOpen(true);
                }}
              >
                + Add New Task
              </AppButton>
            </div>
          </div>
          <div className="h-px bg-lines-light dark:bg-lines-dark" />
        </div>
      </header>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => {
          setIsAddTaskModalOpen(false);
        }}
        board={selectedBoard}
      />
    </>
  );
};
