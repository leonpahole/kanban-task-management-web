import { BoardModels } from "@/util/board/board.models";
import { MathUtils } from "@/util/math.utils";
import { Task } from "@/components/board/task/Task";

interface IProps {
  column: BoardModels.Column;
  onTaskClick(task: BoardModels.Task): void;
}

export const Column = ({ column, onTaskClick }: IProps) => {
  return (
    <section className="flex flex-shrink-0 flex-col">
      {/* heading */}
      <div className="mb-6 flex items-center">
        <div
          className="mr-3 h-4 w-4 rounded-full"
          style={{ backgroundColor: MathUtils.stringToColor(column.name) }}
        />

        <h2 className="text-hs uppercase text-gray-medium">
          {column.name}
          {column.tasks.length > 0 ? `(${column.tasks.length})` : ""}
        </h2>
      </div>

      {/* task list */}
      <div className="flex w-70 flex-1 flex-col gap-5 overflow-auto pb-12 scrollbar-hide">
        {column.tasks.length > 0 ? (
          <>
            {column.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onClick={() => {
                  onTaskClick(task);
                }}
              />
            ))}
          </>
        ) : (
          <div className="w-full rounded-lg border border-dashed border-gray-medium bg-transparent py-6 px-4 text-center italic text-gray-medium opacity-40">
            Drop tasks here
          </div>
        )}
      </div>
    </section>
  );
};
