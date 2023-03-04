import { BoardModels } from "@/util/board/board.models";
import { Rest } from "@/util/rest";

export namespace BoardApi {
  export const list = async (): Promise<BoardModels.BoardExcerpt[]> => {
    return Rest.get<BoardModels.BoardExcerpt[]>("/api/server-proxy/boards");
  };

  export const get = async (id: number): Promise<BoardModels.Board> => {
    return Rest.get<BoardModels.Board>(`/api/server-proxy/boards/${id}`);
  };

  export const add = async ({
    name,
    columns,
  }: BoardModels.BoardRequest): Promise<BoardModels.Board> => {
    return Rest.post<BoardModels.Board>(`/api/server-proxy/boards`, {
      name,
      columns,
    });
  };

  export const edit = async (
    id: number,
    { name, columns }: BoardModels.BoardRequest
  ): Promise<BoardModels.Board> => {
    return Rest.patch<BoardModels.Board>(`/api/server-proxy/boards/${id}`, {
      name,
      columns,
    });
  };

  export const del = async (id: number) => {
    return Rest.del(`/api/server-proxy/boards/${id}`);
  };

  export const addTask = async (
    boardId: number,
    { columnId, title, description, subtasks }: BoardModels.TaskRequest
  ): Promise<BoardModels.Task> => {
    return Rest.post(
      `/api/server-proxy/boards/${boardId}/columns/${columnId}/tasks`,
      {
        title,
        description,
        subtasks,
      }
    );
  };

  export const editTask = async (
    id: number,
    { columnId, title, description, subtasks }: Partial<BoardModels.TaskRequest>
  ): Promise<BoardModels.Task> => {
    return Rest.patch(`/api/server-proxy/tasks/${id}`, {
      title,
      description,
      subtasks,
      columnId,
    });
  };

  export const deleteTask = async (id: number): Promise<void> => {
    return Rest.del(`/api/server-proxy/tasks/${id}`);
  };

  export const changeSubtaskStatus = async (
    id: number,
    taskId: number,
    isCompleted: boolean
  ): Promise<BoardModels.Task> => {
    return Rest.patch(`/api/server-proxy/tasks/${taskId}/subtasks/${id}`, {
      isCompleted,
    });
  };

  export const reorderColumn = async (
    boardId: number,
    columnId: number,
    insertAfterColumnId: number | null
  ) => {
    return Rest.patch(
      `/api/server-proxy/boards/${boardId}/columns/${columnId}/reorder`,
      {
        insertAfterColumnId,
      }
    );
  };

  export const reorderTask = async (
    id: number,
    insertAfterTaskId: number | null,
    columnId: number
  ) => {
    return Rest.patch(`/api/server-proxy/tasks/${id}/reorder`, {
      insertAfterTaskId,
      columnId,
    });
  };
}
