import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import { useAppToast } from "@/hooks/useAppToast";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board: BoardModels.Board;
  task: BoardModels.Task | null;
}

export const DeleteTaskModal = ({ isOpen, onClose, task, board }: IProps) => {
  const deleteTaskMutation = BoardQueries.useDeleteTask();
  const { formattedError } = useAppToast();

  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={async () => {
        try {
          await deleteTaskMutation.mutateAsync({
            boardId: board.id,
            id: task!.id,
          });
          onClose();
        } catch (e: any) {
          formattedError(e?.message);
        }
      }}
      successMessage="Task deleted!"
      confirmButtonLabel="Delete"
      cancelButtonLabel="Cancel"
      heading="Delete this task?"
      description={`Are you sure you want to delete the ‘${task?.title}’ task and its subtasks? This action cannot be reversed.`}
    />
  );
};
