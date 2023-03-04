import { BoardApi } from "@/util/board/board.api";
import { BoardModels } from "@/util/board/board.models";

export namespace BoardService {
  export const sleep = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  export const list = async (): Promise<BoardModels.BoardExcerpt[]> => {
    await sleep();
    return BoardApi.list();
  };

  export const get = (id: number): Promise<BoardModels.Board> => {
    return BoardApi.get(id);
  };

  export const add = (request: BoardModels.BoardRequest) => {
    return BoardApi.add(request);
  };

  export const edit = (id: number, request: BoardModels.BoardRequest) => {
    return BoardApi.edit(id, request);
  };

  export const del = (id: number) => {
    return BoardApi.del(id);
  };

  export const addTask = async (
    boardId: number,
    request: BoardModels.TaskRequest
  ) => {
    return BoardApi.addTask(boardId, request);
  };

  export const editTask = async (
    id: number,
    request: Partial<BoardModels.TaskRequest>
  ) => {
    return BoardApi.editTask(id, request);
  };

  export const deleteTask = async (id: number) => {
    return BoardApi.deleteTask(id);
  };

  export const changeSubtaskStatus = async (
    id: number,
    taskId: number,
    isCompleted: boolean
  ) => {
    return BoardApi.changeSubtaskStatus(id, taskId, isCompleted);
  };

  export const reorderColumn = async (
    boardId: number,
    columnId: number,
    insertAfterColumnId: number | null
  ) => {
    return BoardApi.reorderColumn(boardId, columnId, insertAfterColumnId);
  };

  export const reorderTask = async (
    id: number,
    insertAfterTaskId: number | null,
    columnId: number
  ) => {
    return BoardApi.reorderTask(id, insertAfterTaskId, columnId);
  };
}
