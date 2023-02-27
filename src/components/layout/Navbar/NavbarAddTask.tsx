import { AddTaskModal } from "@/components/board/task/AddTaskModal";
import { AppButton } from "@/components/shared/AppButton";
import { BoardModels } from "@/util/board/board.models";
import { useState } from "react";
import IconAddTaskMobile from "public/images/icon-add-task-mobile.svg";
import Image from "next/image";

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
        className="hidden md:block"
      >
        + Add New Task
      </AppButton>
      <AppButton
        disabled={board == null || board.columns.length === 0}
        onClick={() => {
          setIsAddTaskModalOpen(true);
        }}
        size="md"
        className="md:hidden"
      >
        <Image
          src={IconAddTaskMobile}
          alt="Add new task"
          width="12"
          height="12"
        />
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
