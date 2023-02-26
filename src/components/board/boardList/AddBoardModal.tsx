import { BoardFormModal } from "@/components/board/boardList/BoardFormModal";
import { BoardQueries } from "@/util/board/board.queries";

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const AddBoardModal = ({ isOpen, onClose }: IProps) => {
  const addBoardMutation = BoardQueries.useAddBoard();

  return (
    <BoardFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(req) => addBoardMutation.mutateAsync(req)}
      heading="Add new board"
      submitButtonLabel="Create new board"
      navigateToBoardAfterSuccess
      successMessage="Board added!"
    />
  );
};
