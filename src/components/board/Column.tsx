import { Task, TaskDragHandleClassName } from "@/components/board/task/Task";
import { DragHandle } from "@/components/shared/DragHandle";
import { ReorderableList } from "@/components/shared/ReorderableList";
import { useAppToast } from "@/hooks/useAppToast";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";
import { MathUtils } from "@/util/math.utils";
import { useCallback } from "react";

export const ColumnDragHandleClassName = "__column-drag-handle__";

interface IProps {
  board: BoardModels.Board;
  column: BoardModels.Column;
  onTaskClick(task: BoardModels.Task): void;
}

export const Column = ({ board, column, onTaskClick }: IProps) => {
  const reorderTaskMutation = BoardQueries.useReorderTask();
  const { formattedError } = useAppToast();

  const onTaskReorder = useCallback(
    async (
      fromIndex: number,
      toIndex: number,
      fromId: string | undefined,
      toId: string | undefined
    ) => {
      const fromIdNumber = MathUtils.parseNumber(fromId);
      const toIdNumber = MathUtils.parseNumber(toId);

      if (fromIdNumber == null || toIdNumber == null) {
        return { success: false };
      }

      try {
        await reorderTaskMutation.mutateAsync({
          boardId: board.id,
          id: column.tasks[fromIndex].id,
          toIndex,
          toColumnId: toIdNumber,
        });
        return { success: true };
      } catch (e: any) {
        formattedError(e?.message);
        console.error(e);
      }

      return { success: false };
    },
    [board.id, column.tasks, formattedError, reorderTaskMutation]
  );

  return (
    <section className="group flex flex-shrink-0 flex-col">
      {/* heading */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 h-4 w-4 rounded-full"
            style={{ backgroundColor: MathUtils.stringToColor(column.name) }}
          />

          <h2 className="text-hs uppercase text-gray-medium">
            {column.name}
            {column.tasks.length > 0 ? `(${column.tasks.length})` : ""}
          </h2>
        </div>

        <DragHandle
          className={`opacity-0 transition-opacity group-hover:opacity-100 ${ColumnDragHandleClassName}`}
        />
      </div>

      {/* task list */}
      <ReorderableList
        className="flex w-70 flex-1 flex-col gap-5 overflow-auto pb-12 scrollbar-hide"
        groupName="column-tasks"
        onReorder={onTaskReorder}
        handleClassName={TaskDragHandleClassName}
        dragId={column.id}
        disabled={reorderTaskMutation.isLoading}
        key={column.tasks.length}
      >
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onClick={() => {
              onTaskClick(task);
            }}
          />
        ))}
      </ReorderableList>
    </section>
  );
};
