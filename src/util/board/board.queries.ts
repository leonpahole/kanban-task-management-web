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
      mutationFn: (request: BoardModels.BoardRequest) => {
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

  export const useEditBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        request,
      }: {
        id: number;
        request: BoardModels.BoardRequest;
      }) => {
        return BoardService.edit(id, request);
      },
      onSuccess: (editedBoard: BoardModels.Board) => {
        queryClient.setQueryData(
          boardsKey(),
          (oldBoards: BoardModels.BoardExcerpt[] | undefined) => {
            if (!oldBoards) {
              return [editedBoard];
            }

            return oldBoards.map((board) => {
              if (board.id === editedBoard.id) {
                return editedBoard;
              }

              return board;
            });
          }
        );

        queryClient.setQueryData(boardKey(editedBoard.id), () => {
          return editedBoard;
        });
      },
    });
  };

  export const useDeleteBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: number) => {
        return BoardService.del(id);
      },
      onSuccess: (_, deletedId) => {
        queryClient.setQueryData(
          boardsKey(),
          (oldBoards: BoardModels.BoardExcerpt[] | undefined) => {
            if (!oldBoards) {
              return [];
            }

            return oldBoards.filter((board) => board.id !== deletedId);
          }
        );

        queryClient.setQueryData(boardKey(deletedId), () => {
          return undefined;
        });
      },
    });
  };

  export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        boardId,
        request,
      }: {
        boardId: number;
        request: BoardModels.TaskRequest;
      }) => {
        return BoardService.addTask(boardId, request);
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
                if (col.id === newTask.columnId) {
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

  export const useEditTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        boardId,
        request,
      }: {
        id: number;
        boardId: number;
        request: BoardModels.TaskRequest;
      }) => {
        return BoardService.editTask(id, boardId, request);
      },
      onSuccess: (editedTask, variables) => {
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
                if (col.id === editedTask.columnId) {
                  tasks = col.tasks.map((t) => {
                    if (t.id === editedTask.id) {
                      return editedTask;
                    }

                    return t;
                  });
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
