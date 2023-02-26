import { AddTaskModal } from "@/components/board/task/AddTaskModal";
import { AppButton } from "@/components/shared/AppButton";
import { BoardModels } from "@/util/board/board.models";
import { useState } from "react";

interface IProps {
  board: BoardModels.Board | undefined;
}

export const NavbarAddTask = ({ board }: IProps) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  return (
    <>
      <AppButton
        disabled={board == null || board.columns.length === 0}
        onClick={() => {
          setIsAddTaskModalOpen(true);
        }}
      >
        + Add New Task
      </AppButton>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => {
          setIsAddTaskModalOpen(false);
        }}
        board={board}
      />
    </>
  );
};
