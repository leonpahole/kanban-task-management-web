import { BoardModels } from "@/util/board/board.models";
import { BoardService } from "@/util/board/board.service";
import { MathUtils } from "@/util/math.utils";
import { useRouter } from "next/router";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

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
        request,
      }: {
        id: number;
        boardId: number;
        request: Partial<BoardModels.TaskRequest>;
      }) => {
        return BoardService.editTask(id, request);
      },
      onSuccess: (editedTask, variables) => {
        updateQueryClientWithEditedTask(
          queryClient,
          variables.boardId,
          editedTask
        );
      },
    });
  };

  const updateQueryClientWithEditedTask = (
    queryClient: QueryClient,
    boardId: number,
    editedTask: BoardModels.Task
  ) => {
    queryClient.setQueryData(
      boardKey(boardId),
      (oldBoard: BoardModels.Board | undefined): BoardModels.Board => {
        if (!oldBoard) {
          return undefined as any;
        }

        return {
          ...oldBoard,
          columns: oldBoard.columns.map((col) => {
            let { tasks } = col;
            const task = tasks.find((t) => t.id === editedTask.id);

            // remove if column changed
            if (task && editedTask.columnId !== col.id) {
              tasks = tasks.filter((t) => t.id !== editedTask.id);
            }

            // add if column changed
            if (!task && editedTask.columnId === col.id) {
              tasks = [editedTask, ...tasks];
            }

            if (task && editedTask.columnId === col.id) {
              tasks = tasks.map((t) => {
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
  };

  export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id }: { id: number; boardId: number }) => {
        return BoardService.deleteTask(id);
      },
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          boardKey(variables.boardId),
          (oldBoard: BoardModels.Board | undefined): BoardModels.Board => {
            if (!oldBoard) {
              return undefined as any;
            }

            return {
              ...oldBoard,
              columns: oldBoard.columns.map((col) => {
                const { tasks } = col;
                return {
                  ...col,
                  tasks: tasks.filter((t) => t.id !== variables.id),
                };
              }),
            };
          }
        );
      },
    });
  };

  export const useChangeSubtaskStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        taskId,
        isCompleted,
      }: {
        id: number;
        taskId: number;
        boardId: number;
        isCompleted: boolean;
      }) => {
        return BoardService.changeSubtaskStatus(id, taskId, isCompleted);
      },
      onSuccess: (editedTask, variables) => {
        updateQueryClientWithEditedTask(
          queryClient,
          variables.boardId,
          editedTask
        );
      },
    });
  };

  export const useReorderColumn = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        boardId,
        columnId,
        insertAfterColumnId,
      }: {
        boardId: number;
        columnId: number;
        insertAfterColumnId: number | null;
      }) => {
        return BoardService.reorderColumn(
          boardId,
          columnId,
          insertAfterColumnId
        );
      },
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          boardKey(variables.boardId),
          (prevBoard: BoardModels.Board | undefined) => {
            if (!prevBoard) {
              return undefined as any;
            }

            const newColumns = [...prevBoard.columns];
            const columnIndex = newColumns.findIndex(
              (col) => col.id === variables.columnId
            );

            if (columnIndex < 0) {
              return prevBoard;
            }

            let newIndex = 0;
            if (variables.insertAfterColumnId != null) {
              const insertAfterColumnIndex = newColumns.findIndex(
                (col) => col.id === variables.insertAfterColumnId
              );

              if (insertAfterColumnIndex < 0) {
                return prevBoard;
              }

              newIndex = insertAfterColumnIndex + 1;
            }

            const column = newColumns[columnIndex];

            newColumns.splice(columnIndex, 1);

            let newIndexAdjusted = newIndex;
            if (columnIndex < newIndex) {
              newIndexAdjusted--;
            }

            newColumns.splice(newIndexAdjusted, 0, column);

            return {
              ...prevBoard,
              columns: newColumns,
            };
          }
        );
      },
    });
  };

  export const useReorderTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        insertAfterTaskId,
        columnId,
      }: {
        id: number;
        boardId: number;
        insertAfterTaskId: number | null;
        columnId: number;
      }) => {
        return BoardService.reorderTask(id, insertAfterTaskId, columnId);
      },
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          boardKey(variables.boardId),
          (prevBoard: BoardModels.Board | undefined) => {
            if (!prevBoard) {
              return undefined as any;
            }

            let taskToMove: BoardModels.Task | undefined;
            for (const column of prevBoard.columns) {
              taskToMove = column.tasks.find((t) => t.id === variables.id);
              if (taskToMove) {
                break;
              }
            }

            if (!taskToMove) {
              return prevBoard;
            }

            const insertToColumn = prevBoard.columns.find(
              (c) => c.id === variables.columnId
            );
            if (!insertToColumn) {
              return prevBoard;
            }

            let newIndex = 0;
            if (variables.insertAfterTaskId != null) {
              const taskIndex = insertToColumn.tasks.findIndex(
                (t) => t.id === variables.insertAfterTaskId
              );
              if (taskIndex < 0) {
                return prevBoard;
              }

              newIndex = taskIndex + 1;
            }

            const columns = prevBoard.columns.map((column) => {
              const taskIndex = column.tasks.findIndex(
                (task) => task.id === variables.id
              );

              const isTargetColumn = column.id === variables.columnId;

              const tasks = [...column.tasks];

              if (taskIndex >= 0) {
                // same column, just reorder
                if (isTargetColumn) {
                  tasks.splice(taskIndex, 1);
                  let newIndexAdjusted = newIndex;

                  if (taskIndex < newIndex) {
                    newIndexAdjusted--;
                  }

                  tasks.splice(newIndexAdjusted, 0, taskToMove!);
                }
                // need to remove from this column
                else {
                  tasks.splice(taskIndex, 1);
                }
              } else if (isTargetColumn) {
                // need to insert in this column
                tasks.splice(newIndex, 0, taskToMove!);
              }

              return {
                ...column,
                tasks,
              };
            });

            return {
              ...prevBoard,
              columns,
            };
          }
        );
      },
    });
  };
}
