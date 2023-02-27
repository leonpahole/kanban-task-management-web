import { DragHandle } from "@/components/shared/DragHandle";
import { BoardModels } from "@/util/board/board.models";

export const TaskDragHandleClassName = "__task-drag-handle__";

interface IProps {
  task: BoardModels.Task;
  onClick(): void;
}

export const Task = ({ task, onClick }: IProps) => {
  const numberOfSubtasks = task.subtasks.length;
  const numberOfCompletedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  let subtasksContent;
  if (numberOfSubtasks > 0) {
    subtasksContent = (
      <p className="mt-2 text-bm text-gray-medium">{`${numberOfCompletedSubtasks} of ${numberOfSubtasks} subtasks`}</p>
    );
  }

  return (
    <article className="group-task">
      <button
        className="w-full rounded-lg bg-white py-6 px-4 text-left shadow-md dark:bg-gray-dark"
        type="button"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-hm text-black dark:text-white">{task.title}</h3>
          <DragHandle
            className={`${TaskDragHandleClassName} opacity-0 transition-opacity [.group-task:hover_&]:opacity-100`}
          />
        </div>
        {subtasksContent}
      </button>
    </article>
  );
};
