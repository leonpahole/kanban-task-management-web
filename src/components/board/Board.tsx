import { Column } from "@/components/board/Column";
import { ColumnAdd } from "@/components/board/ColumnAdd";
import { BoardModels } from "@/util/board/board.models";
import { AppButton } from "@/components/shared/AppButton";
import { useMemo, useState } from "react";
import { ViewTaskModal } from "@/components/board/task/ViewTaskModal";
import { EditTaskModal } from "@/components/board/task/EditTaskModal";
import { DeleteTaskModal } from "@/components/board/task/DeleteTaskModal";

interface IProps {
  board: BoardModels.Board;
}

export const Board = ({ board }: IProps) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const selectedTask = useMemo(() => {
    for (const column of board.columns) {
      const task = column.tasks.find((t) => t.id === selectedTaskId);
      if (task) {
        return task;
      }
    }

    return null;
  }, [board.columns, selectedTaskId]);

  const [modalOpen, setModalOpen] = useState<"view" | "edit" | "delete" | null>(
    null
  );

  const closeModal = () => {
    setSelectedTaskId(null);
    setModalOpen(null);
  };

  return (
    <>
      <div className="min-h-0 flex-1 flex-col overflow-x-auto">
        {board.columns.length > 0 ? (
          <div className="flex h-full min-h-0 flex-1 gap-6 pl-6 pt-6">
            {board.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onTaskClick={(task) => {
                  setSelectedTaskId(task.id);
                  setModalOpen("view");
                }}
              />
            ))}
            <ColumnAdd board={board} />
            <div className="w-px flex-shrink-0" />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="mb-8 text-center text-hl text-gray-medium">
              This board is empty. Create a new column to get started.
            </p>
            <AppButton>+ Add New Column</AppButton>
          </div>
        )}
      </div>
      <ViewTaskModal
        board={board}
        isOpen={modalOpen === "view"}
        task={selectedTask}
        onClose={closeModal}
        onEditClick={() => setModalOpen("edit")}
        onDeleteClick={() => setModalOpen("delete")}
      />
      <EditTaskModal
        board={board}
        task={selectedTask}
        isOpen={modalOpen === "edit"}
        onClose={closeModal}
      />
      <DeleteTaskModal
        board={board}
        task={selectedTask}
        isOpen={modalOpen === "delete"}
        onClose={closeModal}
      />
    </>
  );
};
