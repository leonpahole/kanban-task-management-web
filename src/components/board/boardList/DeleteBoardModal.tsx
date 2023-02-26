import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";
import { useRouter } from "next/router";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board: BoardModels.Board;
}

export const DeleteBoardModal = ({ isOpen, onClose, board }: IProps) => {
  const addBoardMutation = BoardQueries.useDeleteBoard();
  const router = useRouter();

  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={async () => {
        await addBoardMutation.mutateAsync(board.id);
        router.push("/");
      }}
      successMessage="Board deleted!"
      confirmButtonLabel="Delete"
      cancelButtonLabel="Cancel"
      heading="Delete this board?"
      description={`Are you sure you want to delete the ‘${board.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
    />
  );
};
