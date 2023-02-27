import { ColumnList } from "@/components/board/ColumnList";
import { DeleteTaskModal } from "@/components/board/task/DeleteTaskModal";
import { EditTaskModal } from "@/components/board/task/EditTaskModal";
import { ViewTaskModal } from "@/components/board/task/ViewTaskModal";
import { BoardModels } from "@/util/board/board.models";
import { useMemo, useState } from "react";

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
        <ColumnList
          board={board}
          onTaskClick={(task) => {
            setSelectedTaskId(task.id);
            setModalOpen("view");
          }}
        />
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
