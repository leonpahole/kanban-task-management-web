import { TaskFormModal } from "@/components/board/task/TaskFormModal";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board?: BoardModels.Board;
}

export const AddTaskModal = ({ isOpen, onClose, board }: IProps) => {
  const addTaskMutation = BoardQueries.useAddTask();

  return (
    <TaskFormModal
      board={board}
      heading="Add new task"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(request) =>
        addTaskMutation.mutateAsync({ boardId: board!.id, request })
      }
      submitButtonLabel="Create task"
      successMessage="Task created!"
    />
  );
};
