import { EditBoardModal } from "@/components/board/boardList/EdtiBoardModal";
import { BoardModels } from "@/util/board/board.models";
import { useState } from "react";

interface IProps {
  board: BoardModels.Board;
}

export const ColumnAdd = ({ board }: IProps) => {
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <button
        className="mt-10 mb-12 flex w-70 flex-shrink-0 items-center justify-center self-stretch rounded-md bg-add-column-gradient-light text-hxl text-gray-medium hover:text-purple-100 dark:bg-add-column-gradient-dark"
        type="button"
        onClick={() => setIsEditBoardModalOpen(true)}
      >
        + New Column
      </button>
      <EditBoardModal
        isOpen={isEditBoardModalOpen}
        onClose={() => setIsEditBoardModalOpen(false)}
        board={board}
      />
    </>
  );
};
