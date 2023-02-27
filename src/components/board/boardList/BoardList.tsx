import { BoardListItem } from "@/components/board/boardList/BoardListItem";
import { BoardListItemAdd } from "@/components/board/boardList/BoardListItemAdd";
import { ErrorText } from "@/components/shared/ErrorText";
import { CenteredSpinner } from "@/components/shared/Spinner";
import { BoardService } from "@/util/board/board.service";
import { useQuery } from "react-query";

interface IProps {
  className?: string;
  onModalOpen?(): void;
}

export const BoardList = ({ className, onModalOpen }: IProps) => {
  const {
    data: boards,
    isLoading,
    error,
    refetch,
  } = useQuery("boards", () => BoardService.list());

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
          <BoardListItemAdd onModalOpen={onModalOpen} />
        </ul>
      </nav>
    );
  }

  return (
    <div className={className}>
      <h2 className="mx-6 mb-4.5 text-bm uppercase text-gray-medium md:mx-8">
        All boards {boards ? `(${boards.length})` : ""}
      </h2>
      {content}
    </div>
  );
};
