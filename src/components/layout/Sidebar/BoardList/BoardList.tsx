import { BoardModels } from "@/util/board/board.models";
import { BoardListItemAdd } from "@/components/layout/Sidebar/BoardList/BoardListItemAdd";
import { BoardListItem } from "@/components/layout/Sidebar/BoardList/BoardListItem";

interface IProps {
  boards: BoardModels.Board[];
}

export const BoardList = ({ boards }: IProps) => {
  const onBoardAddClick = () => {};

  return (
    <div>
      <h2 className="ml-8 mb-4.5 text-bm uppercase text-gray-medium">
        All boards ({boards.length})
      </h2>
      <nav>
        <ul>
          {boards.map((board) => (
            <BoardListItem board={board} key={board.id} />
          ))}
          <BoardListItemAdd onClick={onBoardAddClick} />
        </ul>
      </nav>
    </div>
  );
};
