import { Board } from "@/components/board/Board";
import { Layout } from "@/components/layout/Layout";
import { ErrorText } from "@/components/shared/ErrorText";
import { CenteredSpinner } from "@/components/shared/Spinner";
import { BoardQueries } from "@/util/board/board.queries";
import Head from "next/head";

export default function BoardView() {
  const {
    data: board,
    isLoading,
    error,
    refetch,
    isIdle,
  } = BoardQueries.useSelectedBoard();

  let title = "Your kanban board";
  if (board) {
    title = `${board.name} | ${title}`;
  }

  let content;
  if (isIdle || isLoading) {
    content = (
      <div className="h-100 flex flex-1 items-center justify-center">
        <CenteredSpinner />
      </div>
    );
  } else if (error) {
    content = (
      <div className="h-100 flex flex-1 items-center justify-center">
        <ErrorText error={error as Error} onRetryClick={refetch} />
      </div>
    );
  } else {
    content = <Board board={board!} />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>{content}</Layout>
    </>
  );
}
