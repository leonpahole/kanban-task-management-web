import { EditBoardModal } from "@/components/board/boardList/EdtiBoardModal";
import { Column, ColumnDragHandleClassName } from "@/components/board/Column";
import { ColumnAdd } from "@/components/board/ColumnAdd";
import { AppButton } from "@/components/shared/AppButton";
import { ReorderableList } from "@/components/shared/ReorderableList";
import { useAppToast } from "@/hooks/useAppToast";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";
import { useCallback, useState } from "react";

interface IProps {
  board: BoardModels.Board;
  onTaskClick(task: BoardModels.Task): void;
}

export const ColumnList = ({ board, onTaskClick }: IProps) => {
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] =
    useState<boolean>(false);

  const { formattedError } = useAppToast();

  const reorderColumnMutation = BoardQueries.useReorderColumn();

  const onColumnReordered = useCallback(
    async (fromIndex: number, toIndex: number) => {
      try {
        await reorderColumnMutation.mutateAsync({
          boardId: board.id,
          columnId: board.columns[fromIndex].id,
          index: toIndex,
        });
        return { success: true };
      } catch (e: any) {
        formattedError(e?.message);
        console.error(e);
      }

      return { success: false };
    },
    [board.columns, board.id, formattedError, reorderColumnMutation]
  );

  let content;
  if (board.columns.length === 0) {
    content = (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="mb-8 text-center text-hl text-gray-medium">
          This board is empty. Create a new column to get started.
        </p>
        <AppButton onClick={() => setIsEditBoardModalOpen(true)}>
          + Add New Column
        </AppButton>
      </div>
    );
  } else {
    content = (
      <div className="flex h-full min-h-0 flex-1 pl-6 pt-6">
        <ReorderableList
          className="flex gap-6"
          handleClassName={ColumnDragHandleClassName}
          disabled={reorderColumnMutation.isLoading}
          onReorder={onColumnReordered}
        >
          {board.columns.map((column) => (
            <Column
              key={column.id}
              board={board}
              column={column}
              onTaskClick={onTaskClick}
            />
          ))}
        </ReorderableList>
        <ColumnAdd onClick={() => setIsEditBoardModalOpen(true)} />
        <div className="w-px flex-shrink-0" />
      </div>
    );
  }

  return (
    <>
      {content}
      <EditBoardModal
        isOpen={isEditBoardModalOpen}
        onClose={() => setIsEditBoardModalOpen(false)}
        board={board}
      />
    </>
  );
};
