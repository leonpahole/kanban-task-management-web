import { BoardFormModal } from "@/components/board/boardList/BoardFormModal";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board: BoardModels.Board;
  autoFocusColumns?: boolean;
}

export const EditBoardModal = ({
  isOpen,
  onClose,
  board,
  autoFocusColumns = false,
}: IProps) => {
  const addBoardMutation = BoardQueries.useEditBoard();

  return (
    <BoardFormModal
      isOpen={isOpen}
      onClose={onClose}
      initialValue={board}
      onSubmit={(request) =>
        addBoardMutation.mutateAsync({ id: board.id, request })
      }
      heading="Edit board"
      submitButtonLabel="Save Changes"
      successMessage="Board edited!"
      autoFocusColumns={autoFocusColumns}
    />
  );
};
