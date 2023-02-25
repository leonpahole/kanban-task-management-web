import { BoardModels } from "@/util/board/board.models";

export namespace BoardApi {
  const testData: BoardModels.Board[] = [
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

  export const add = async (
    name: string,
    columnNames: string[]
  ): Promise<BoardModels.Board> => {
    if (name.length === 4) {
      throw new Error("Some server error");
    }

    await sleep(3000);

    const newBoard: BoardModels.Board = {
      id: name.length * 30,
      name,
      columns: columnNames.map((n, id) => ({
        id,
        name: n,
        tasks: [],
      })),
    };

    testData.unshift(newBoard);
    return newBoard;
  };

  export const addTask = async (
    boardId: number,
    columnId: number,
    title: string,
    description: string,
    subtasksNames: string[]
  ) => {
    const board = testData.find((b) => b.id === boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    const column = board.columns.find((c) => c.id === columnId);
    if (!column) {
      throw new Error("Column not found");
    }

    const newTask = {
      id: column.tasks.length,
      title,
      description,
      subtasks: subtasksNames.map((sn, id) => ({
        id: id * 1000,
        title: sn,
        isCompleted: false,
      })),
    };

    // column.tasks = [newTask, ...column.tasks];

    return newTask;
  };
}
