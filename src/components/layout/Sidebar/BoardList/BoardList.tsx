import { BoardListItem } from "@/components/layout/Sidebar/BoardList/BoardListItem";
import { BoardListItemAdd } from "@/components/layout/Sidebar/BoardList/BoardListItemAdd";
import { ErrorText } from "@/components/shared/ErrorText";
import { CenteredSpinner } from "@/components/shared/Spinner";
import { BoardService } from "@/util/board/board.service";
import { useQuery } from "react-query";

export const BoardList = () => {
  const {
    data: boards,
    isLoading,
    error,
    refetch,
  } = useQuery("boards", () => BoardService.list());

  const onBoardAddClick = () => {};

  let content;

  if (isLoading) {
    content = <CenteredSpinner />;
  } else if (error) {
    content = (
      <ErrorText
        className="text-center"
        onRetryClick={refetch}
        error={error as Error}
      />
    );
  } else {
    content = (
      <nav>
        <ul>
          {boards!.map((board) => (
            <BoardListItem board={board} key={board.id} />
          ))}
          <BoardListItemAdd onClick={onBoardAddClick} />
        </ul>
      </nav>
    );
  }

  return (
    <div>
      <h2 className="ml-8 mb-4.5 text-bm uppercase text-gray-medium">
        All boards {boards ? `(${boards.length})` : ""}
      </h2>
      {content}
    </div>
  );
};
