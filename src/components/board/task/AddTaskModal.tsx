import { AppButton } from "@/components/shared/AppButton";
import { AppModal } from "@/components/shared/AppModal";
import {
  AppDropdown,
  AppDropdownOption,
} from "@/components/shared/forms/AppDropdown";
import { AppInput } from "@/components/shared/forms/AppInput";
import { AppListInput } from "@/components/shared/forms/AppListInput";
import { AppTextarea } from "@/components/shared/forms/AppTextarea";
import { useAppToast } from "@/hooks/useAppToast";
import { BoardModels } from "@/util/board/board.models";
import { BoardQueries } from "@/util/board/board.queries";
import { StringUtils } from "@/util/string.utils";
import { useEffect, useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board?: BoardModels.Board;
}

export const AddTaskModal = ({ isOpen, onClose, board }: IProps) => {
  const toast = useAppToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [task, setTask] = useState<BoardModels.AddTaskRequest | null>(null);

  const addTaskMutation = BoardQueries.useAddTask();

  const statusOptions: AppDropdownOption[] = (board?.columns || []).map(
    (column) => ({
      value: column.id,
      label: column.name,
    })
  );

  useEffect(() => {
    if (!board || board.columns.length === 0) {
      setTask(null);
    } else {
      setTask({
        title: "",
        description: "",
        subtasksNames: [""],
        columnId: board.columns[0].id,
      });
    }
  }, [board]);

  const updateTask = (data: Partial<typeof task>) => {
    setTask((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        ...data,
      };
    });
  };

  const onAdd = async () => {
    if (!task || !board) {
      return;
    }

    if (!StringUtils.isNotBlank(task.title)) {
      setNameError("Can't be empty");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await addTaskMutation.mutateAsync({
        boardId: board.id,
        task,
      });

      onClose();
      setTask(null);
    } catch (e: any) {
      toast.formattedError(e?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      contentLabel="Add a new board"
      shouldCloseOnEsc={!isLoading}
      shouldCloseOnOverlayClick={!isLoading}
    >
      <h2 className="mb-6 text-hl text-black dark:text-white">Add new task</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd();
        }}
      >
        <AppInput
          id="add-task-title"
          label="Title"
          placeholder="e.g. Take coffee break"
          wrapperClassName="mb-6"
          value={task?.title}
          onTextChange={(title) => updateTask({ title })}
          error={nameError}
          autoFocus
          disabled={isLoading}
        />

        <AppTextarea
          id="add-task-description"
          label="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          wrapperClassName="mb-6"
          value={task?.description}
          onTextChange={(description) => updateTask({ description })}
          disabled={isLoading}
          rows={5}
        />

        <AppListInput
          id="add-task-subtasks"
          value={task?.subtasksNames || []}
          onChange={(subtasksNames) => updateTask({ subtasksNames })}
          label="Subtasks"
          disabled={isLoading}
          placeholders={["e.g. Make coffee", "e.g. Drink coffee & smile"]}
          buttonLabel="+ Add New Subtask"
          className="mb-6"
        />

        <AppDropdown
          options={statusOptions}
          id="add-task-status"
          label="Status"
          value={task?.columnId}
          onSelect={({ value }) => updateTask({ columnId: value as number })}
        />

        <AppButton
          variant="primary"
          size="sm"
          className="mt-6 w-full"
          disabled={isLoading}
          type="submit"
        >
          Create Task
        </AppButton>
      </form>
    </AppModal>
  );
};
