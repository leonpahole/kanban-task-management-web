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

  export const add = (request: BoardModels.AddBoardRequest) => {
    return BoardApi.add(request.name, request.columnNames);
  };

  export const addTask = async (
    boardId: number,
    request: BoardModels.AddTaskRequest
  ) => {
    return BoardApi.addTask(
      boardId,
      request.columnId,
      request.title,
      request.description,
      request.subtasksNames
    );
  };
}
