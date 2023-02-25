export namespace BoardModels {
  export interface BoardExcerpt {
    id: number;
    name: string;
  }

  export interface Board extends BoardExcerpt {
    columns: Column[];
  }

  export type AddBoardRequest = Pick<BoardExcerpt, "name"> & {
    columnNames: string[];
  };

  export interface Column {
    id: number;
    name: string;
    tasks: Task[];
  }

  export interface Task {
    id: number;
    title: string;
    description: string;
    subtasks: Subtask[];
  }

  export type AddTaskRequest = Pick<Task, "title" | "description"> & {
    columnId: number;
    subtasksNames: string[];
  };

  export enum TaskStatus {
    TODO = "TODO",
    DOING = "DOING",
    DONE = "DONE",
  }

  export interface Subtask {
    id: number;
    title: string;
    isCompleted: boolean;
  }
}
