import { BoardModels } from "@/util/board/board.models";

export namespace BoardApi {
  let testData: BoardModels.Board[] = [
    {
      id: 1,
      name: "No tasks",
      columns: [],
    },
    {
      id: 2,
      name: "Platform Launch",
      columns: [
        {
          id: 3,
          name: "Todo",
          tasks: [
            {
              id: 4,
              title: "Build UI for onboarding flow",
              description: "",
              columnId: 3,
              subtasks: [
                {
                  id: 5,
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  id: 6,
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  id: 7,
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 8,
              title: "Build UI for search",
              description: "",
              columnId: 3,
              subtasks: [
                {
                  id: 9,
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 10,
              title: "Build settings UI",
              description: "",
              columnId: 3,
              subtasks: [
                {
                  id: 20,
                  title: "Account page",
                  isCompleted: false,
                },
                {
                  id: 30,
                  title: "Billing page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 11,
              title: "QA and test all major user journeys",
              columnId: 3,
              description:
                "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
              subtasks: [
                {
                  id: 12,
                  title: "Internal testing",
                  isCompleted: false,
                },
                {
                  id: 13,
                  title: "External testing",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  export const list = async (): Promise<BoardModels.BoardExcerpt[]> => {
    return JSON.parse(JSON.stringify(testData));
  };

  const sleep = (timeout: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  };

  export const get = async (id: number): Promise<BoardModels.Board> => {
    const board = JSON.parse(JSON.stringify(testData)).find(
      (b: any) => b.id === id
    );
    await sleep(1000);
    if (!board) {
      throw new Error("Not found");
    }

    return board;
  };

  export const add = async ({
    name,
    columns,
  }: BoardModels.BoardRequest): Promise<BoardModels.Board> => {
    if (name.length === 4) {
      throw new Error("Some server error");
    }

    await sleep(3000);

    const newBoard: BoardModels.Board = {
      id: name.length * 30,
      name,
      columns: columns.map((n, id) => ({
        id,
        name: n.name,
        tasks: [],
      })),
    };

    testData.unshift(newBoard);
    return newBoard;
  };

  export const edit = async (
    id: number,
    { name, columns }: BoardModels.BoardRequest
  ): Promise<BoardModels.Board> => {
    if (name.length === 4) {
      throw new Error("Some server error");
    }

    await sleep(3000);

    const board = testData.find((b) => b.id === id);
    if (!board) {
      throw new Error("Board nout found");
    }

    board.name = name;

    const newColumns: BoardModels.Column[] = [];

    for (const column of columns) {
      const existing =
        column.id != null
          ? board.columns.find((c) => c.id === column.id)
          : undefined;

      if (existing) {
        newColumns.push({
          ...existing,
          name: column.name,
        });
      } else {
        newColumns.push({
          id: 100 * Math.random() + 20,
          name: column.name,
          tasks: [],
        });
      }
    }

    board.columns = newColumns;

    return board;
  };

  export const del = async (id: number) => {
    testData = testData.filter((b) => b.id !== id);
  };

  export const addTask = async (
    boardId: number,
    { columnId, title, description, subtasks }: BoardModels.TaskRequest
  ): Promise<BoardModels.Task> => {
    const board = testData.find((b) => b.id === boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    const column = board.columns.find((c) => c.id === columnId);
    if (!column) {
      throw new Error("Column not found");
    }

    const newTask: BoardModels.Task = {
      id: column.tasks.length,
      title,
      description,
      columnId,
      subtasks: subtasks.map((sn, id) => ({
        id: id * 1000,
        title: sn.name,
        isCompleted: false,
      })),
    };

    return newTask;
  };

  export const editTask = async (
    id: number,
    boardId: number,
    { columnId, title, description, subtasks }: BoardModels.TaskRequest
  ): Promise<BoardModels.Task> => {
    const board = testData.find((b) => b.id === boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    const column = board.columns.find((c) => c.id === columnId);
    if (!column) {
      throw new Error("Column not found");
    }

    const task = column.tasks.find((t) => t.id === id);

    if (!task) {
      throw new Error("Task not found");
    }

    const newSubtasks: BoardModels.Subtask[] = [];

    for (const subtask of subtasks) {
      const existing =
        subtask.id != null
          ? task.subtasks.find((c) => c.id === subtask.id)
          : undefined;

      if (existing) {
        newSubtasks.push({
          ...existing,
          title: subtask.name,
        });
      } else {
        newSubtasks.push({
          id: 100 * Math.random() + 20,
          title: subtask.name,
          isCompleted: false,
        });
      }
    }

    task.description = description;
    task.title = title;

    task.subtasks = newSubtasks;

    return task;
  };
}
