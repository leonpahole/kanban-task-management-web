import { Column } from "@/components/board/Column";
import { ColumnAdd } from "@/components/board/ColumnAdd";
import { BoardModels } from "@/util/board/board.models";
import { AppButton } from "@/components/shared/AppButton";

interface IProps {
  board: BoardModels.Board;
}

export const Board = ({ board }: IProps) => {
  return (
    <div className="min-h-0 flex-1 flex-col overflow-x-auto">
      {board.columns.length > 0 ? (
        <div className="flex h-full min-h-0 flex-1 gap-6 pl-6 pt-6">
          {board.columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
          <ColumnAdd />
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
  );
};
