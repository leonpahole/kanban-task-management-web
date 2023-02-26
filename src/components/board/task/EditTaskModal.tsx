import { TaskFormModal } from "@/components/board/task/TaskFormModal";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board: BoardModels.Board;
  task: BoardModels.Task | null;
}

export const EditTaskModal = ({ isOpen, onClose, board, task }: IProps) => {
  const editTaskMutation = BoardQueries.useEditTask();

  return (
    <TaskFormModal
      board={board}
      heading="Edit task"
      isOpen={isOpen}
      onClose={onClose}
      initialValue={task}
      onSubmit={(request) =>
        editTaskMutation.mutateAsync({
          boardId: board!.id,
          id: task!.id,
          request,
        })
      }
      submitButtonLabel="Save changes"
      successMessage="Task edited!"
    />
  );
};
