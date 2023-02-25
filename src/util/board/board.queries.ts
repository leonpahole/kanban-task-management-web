import { BoardModels } from "@/util/board/board.models";
import { BoardService } from "@/util/board/board.service";
import { MathUtils } from "@/util/math.utils";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

export namespace BoardQueries {
  const boardsKey = () => "boards";

  export const useBoards = () =>
    useQuery(boardsKey(), () => BoardService.list());

  const boardKey = (id: number | null) => ["boards", id];

  export const useBoard = (id: number | null) =>
    useQuery(boardKey(id), () => BoardService.get(id!), {
      enabled: id != null,
    });

  export const useSelectedBoard = () => {
    const router = useRouter();
    const { id } = router.query;

    return useBoard(MathUtils.parseNumber(id as string));
  };

  export const useAddBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (request: BoardModels.AddBoardRequest) => {
        return BoardService.add(request);
      },
      onSuccess: (newBoard) => {
        queryClient.setQueryData(
          boardsKey(),
          (oldBoards: BoardModels.BoardExcerpt[] | undefined) => {
            if (!oldBoards) {
              return [newBoard];
            }

            return [newBoard, ...oldBoards];
          }
        );

        queryClient.setQueryData(boardKey(newBoard.id), () => {
          return newBoard;
        });
      },
    });
  };

  export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        boardId,
        task,
      }: {
        boardId: number;
        task: BoardModels.AddTaskRequest;
      }) => {
        return BoardService.addTask(boardId, task);
      },
      onSuccess: (newTask, variables) => {
        queryClient.setQueryData(
          boardKey(variables.boardId),
          (oldBoard: BoardModels.Board | undefined): BoardModels.Board => {
            if (!oldBoard) {
              return undefined as any;
            }

            return {
              ...oldBoard,
              columns: oldBoard.columns.map((col) => {
                let { tasks } = col;
                if (col.id === variables.task.columnId) {
                  tasks = [newTask, ...col.tasks];
                }

                return {
                  ...col,
                  tasks,
                };
              }),
            };
          }
        );
      },
    });
  };
}
