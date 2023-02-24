import { Task } from "@/components/board/Task";
import { BoardModels } from "@/util/board/board.models";
import { MathUtils } from "@/util/math.utils";

interface IProps {
  column: BoardModels.Column;
}

export const Column = ({ column }: IProps) => {
  return (
    <section className="flex-shrink-0">
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
      <div className="flex w-70 flex-col gap-5">
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};
