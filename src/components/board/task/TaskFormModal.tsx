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
import { StringUtils } from "@/util/string.utils";
import { useEffect, useState } from "react";

const emptyValue = (columnId: number): BoardModels.TaskRequest => ({
  title: "",
  columnId,
  description: "",
  subtasks: [{ name: "" }],
});

interface IProps {
  isOpen: boolean;
  onClose(): void;
  board: BoardModels.Board | undefined;
  initialValue?: BoardModels.Task | null;
  onSubmit(value: BoardModels.TaskRequest): Promise<BoardModels.Task>;
  successMessage?: string;
  heading: string;
  submitButtonLabel: string;
}

export const TaskFormModal = ({
  isOpen,
  onClose,
  board,
  initialValue,
  onSubmit,
  submitButtonLabel,
  successMessage,
  heading,
}: IProps) => {
  const toast = useAppToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [nameError, setNameError] = useState<string | null>(null);

  const [task, setTask] = useState<BoardModels.TaskRequest | null>(null);

  const statusOptions: AppDropdownOption[] = (board?.columns || []).map(
    (column) => ({
      value: column.id,
      label: column.name,
    })
  );

  useEffect(() => {
    if (!board || board.columns.length === 0) {
      setTask(null);
    } else if (!initialValue) {
      setTask(emptyValue(board.columns[0].id));
    } else {
      setTask({
        description: initialValue.description,
        subtasks: initialValue.subtasks.map((subtask) => ({
          id: subtask.id,
          name: subtask.name,
        })),
        title: initialValue.title,
        columnId: initialValue.columnId,
      });
    }
  }, [board, initialValue]);

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

  const onFormSubmit = async () => {
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
      await onSubmit({
        ...task,
        subtasks: task.subtasks.filter((c) => StringUtils.isNotBlank(c.name)),
      });

      onClose();
      setTask(null);
      if (successMessage) {
        toast.success(successMessage);
      }
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
      contentLabel={heading}
      shouldCloseOnEsc={!isLoading}
      shouldCloseOnOverlayClick={!isLoading}
    >
      <h2 className="mb-6 text-hl text-black dark:text-white">{heading}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}
      >
        <AppInput
          id="task-form-title"
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
          id="task-form-description"
          label="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          wrapperClassName="mb-6"
          value={task?.description}
          onTextChange={(description) => updateTask({ description })}
          disabled={isLoading}
          rows={5}
        />

        <AppListInput
          id="task-form-subtasks"
          value={task?.subtasks || []}
          onChange={(subtasks) => updateTask({ subtasks })}
          label="Subtasks"
          disabled={isLoading}
          placeholders={["e.g. Make coffee", "e.g. Drink coffee & smile"]}
          buttonLabel="+ Add New Subtask"
          className="mb-6"
        />

        <AppDropdown
          options={statusOptions}
          id="task-form-status"
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
          {submitButtonLabel}
        </AppButton>
      </form>
    </AppModal>
  );
};
