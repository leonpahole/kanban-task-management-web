export namespace BoardModels {
  export interface BoardExcerpt {
    id: number;
    name: string;
  }

  export interface Board extends BoardExcerpt {
    columns: Column[];
  }

  export interface Column {
    id: number;
    name: string;
    tasks: Task[];
  }

  export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    subtasks: Subtask[];
  }

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
