import { ViewTaskModalMenu } from "@/components/board/task/ViewTaskModalMenu";
import { AppModal } from "@/components/shared/AppModal";
import {
  AppCheckboxList,
  AppCheckboxListValue,
} from "@/components/shared/forms/AppCheckboxList";
import {
  AppDropdown,
  AppDropdownOption,
} from "@/components/shared/forms/AppDropdown";
import { useAppToast } from "@/hooks/useAppToast";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board: BoardModels.Board;
  task: BoardModels.Task | null;
  onEditClick(): void;
  onDeleteClick(): void;
}

export const ViewTaskModal = ({
  isOpen,
  onClose,
  board,
  task,
  onEditClick,
  onDeleteClick,
}: IProps) => {
  const { formattedError } = useAppToast();

  const changeSubtaskStatusMutation = BoardQueries.useChangeSubtaskStatus();
  const editSubtaskMutation = BoardQueries.useEditTask();

  const isLoading =
    changeSubtaskStatusMutation.isLoading || editSubtaskMutation.isLoading;

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      contentLabel={task ? `Task: ${task.title}` : ""}
    >
      <ViewTaskModalContent
        board={board}
        task={task}
        isLoading={isLoading}
        onColumnChange={async (columnId) => {
          try {
            await editSubtaskMutation.mutateAsync({
              boardId: board.id,
              id: task!.id,
              request: { columnId },
            });
          } catch (e: any) {
            formattedError(e?.message);
          }
        }}
        onSubtaskStatusChange={async (id, isCompleted) => {
          try {
            await changeSubtaskStatusMutation.mutateAsync({
              boardId: board.id,
              taskId: task!.id,
              id,
              isCompleted,
            });
          } catch (e: any) {
            formattedError(e?.message);
          }
        }}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </AppModal>
  );
};

interface ContentProps {
  board: BoardModels.Board;
  task: BoardModels.Task | null;
  isLoading: boolean;
  onColumnChange(columnId: number): void;
  onSubtaskStatusChange(id: number, isCompleted: boolean): void;
  onEditClick(): void;
  onDeleteClick(): void;
}

const ViewTaskModalContent = ({
  task,
  board,
  isLoading,
  onColumnChange,
  onSubtaskStatusChange,
  onEditClick,
  onDeleteClick,
}: ContentProps) => {
  if (!task) {
    return null;
  }

  const allSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter((s) => s.isCompleted).length;

  const subtasksCheckboxListValues: AppCheckboxListValue = task.subtasks.map(
    (st) => ({
      id: st.id,
      label: st.title,
      value: st.isCompleted,
    })
  );

  const statusOptions: AppDropdownOption[] = board.columns.map((column) => ({
    label: column.name,
    value: column.id,
  }));

  return (
    <>
      <div className="mb-6 flex justify-between gap-1">
        <h2 className="text-hl text-black dark:text-white">{task.title}</h2>
        <ViewTaskModalMenu
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      </div>
      {task.description && (
        <p className="mb-6 text-bl text-gray-medium">{task.description}</p>
      )}
      {task.subtasks.length > 0 && (
        <AppCheckboxList
          label={`Subtasks (${completedSubtasks} of ${allSubtasks})`}
          value={subtasksCheckboxListValues}
          className="mb-6"
          disabled={isLoading}
          onChange={(id, isCompleted) => {
            onSubtaskStatusChange(id as number, isCompleted);
          }}
        />
      )}
      <AppDropdown
        id="task-view-status"
        label="Current status"
        options={statusOptions}
        value={task.columnId}
        disabled={isLoading}
        onSelect={({ value }) => {
          onColumnChange(value as number);
        }}
      />
    </>
  );
};
