import { BoardModels } from "@/util/board/board.models";

interface IProps {
  task: BoardModels.Task;
}

export const Task = ({ task }: IProps) => {
  const numberOfSubtasks = task.subtasks.length;
  const numberOfCompletedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  let subtasksContent;
  if (numberOfSubtasks > 0) {
    subtasksContent = (
      <p className="mt-2 text-bm text-gray-medium">{`${numberOfCompletedSubtasks} of ${numberOfCompletedSubtasks} subtasks`}</p>
    );
  }

  return (
    <article className="w-full rounded-lg bg-white py-6 px-4 shadow-md dark:bg-gray-dark">
      <h3 className="text-hm text-black dark:text-white">{task.title}</h3>
      {subtasksContent}
    </article>
  );
};
