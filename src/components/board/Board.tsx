import { Column } from "@/components/board/Column";
import { ColumnAdd } from "@/components/board/ColumnAdd";
import { BoardModels } from "@/util/board/board.models";

interface IProps {
  board: BoardModels.Board;
}

export const Board = ({ board }: IProps) => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex gap-6 pl-6 pt-6 pb-12">
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <ColumnAdd />
        <div className="w-6 flex-shrink-0" />
      </div>
    </div>
  );
};
