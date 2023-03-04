export namespace BoardModels {
  export interface BoardExcerpt {
    id: number;
    name: string;
  }

  export interface Board extends BoardExcerpt {
    columns: Column[];
  }

  export type BoardRequest = Pick<BoardExcerpt, "name"> & {
    columns: { id?: number; name: string }[];
  };

  export interface Column {
    id: number;
    name: string;
    tasks: Task[];
  }

  export interface Task {
    id: number;
    title: string;
    columnId: number;
    description: string;
    subtasks: Subtask[];
  }

  export type TaskRequest = Pick<Task, "title" | "description"> & {
    columnId: number;
    subtasks: { id?: number; name: string }[];
  };

  export enum TaskStatus {
    TODO = "TODO",
    DOING = "DOING",
    DONE = "DONE",
  }

  export interface Subtask {
    id: number;
    name: string;
    isCompleted: boolean;
  }
}
