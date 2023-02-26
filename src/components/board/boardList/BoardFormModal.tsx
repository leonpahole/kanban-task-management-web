import { AppButton } from "@/components/shared/AppButton";
import { AppModal } from "@/components/shared/AppModal";
import { AppInput } from "@/components/shared/forms/AppInput";
import { AppListInput } from "@/components/shared/forms/AppListInput";
import { useAppToast } from "@/hooks/useAppToast";
import { BoardModels } from "@/util/board/board.models";
import { StringUtils } from "@/util/string.utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const emptyValue: BoardModels.BoardRequest = {
  name: "",
  columns: [{ name: "" }],
};

interface IProps {
  isOpen: boolean;
  onClose(): void;
  initialValue?: BoardModels.Board;
  onSubmit(value: BoardModels.BoardRequest): Promise<BoardModels.Board>;
  successMessage?: string;
  navigateToBoardAfterSuccess?: boolean;
  heading: string;
  submitButtonLabel: string;
}

export const BoardFormModal = ({
  isOpen,
  onClose,
  initialValue,
  onSubmit,
  successMessage,
  navigateToBoardAfterSuccess,
  heading,
  submitButtonLabel,
}: IProps) => {
  const router = useRouter();
  const toast = useAppToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [board, setBoard] = useState<BoardModels.BoardRequest>(emptyValue);

  const resetForm = () => {
    setBoard(emptyValue);
  };

  useEffect(() => {
    if (initialValue) {
      setBoard({
        name: initialValue.name,
        columns: initialValue.columns.map((c) => ({
          id: c.id,
          name: c.name,
        })),
      });
    } else {
      resetForm();
    }
  }, [initialValue]);

  const [nameError, setNameError] = useState<string | null>(null);

  const updateBoard = (data: Partial<typeof board>) => {
    setBoard((prev) => {
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
    if (!StringUtils.isNotBlank(board.name)) {
      setNameError("Can't be empty");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const boardResult = await onSubmit({
        name: board.name,
        columns: board.columns.filter((c) => StringUtils.isNotBlank(c.name)),
      });

      onClose();

      if (successMessage) {
        toast.success(successMessage);
      }

      if (navigateToBoardAfterSuccess) {
        router.push(`/board/${boardResult.id}`);
      }

      resetForm();
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
          id="board-form-name"
          label="Board name"
          placeholder="e.g. Web Design"
          wrapperClassName="mb-6"
          value={board.name}
          onTextChange={(name) => updateBoard({ name })}
          error={nameError}
          autoFocus
          disabled={isLoading}
        />

        <AppListInput
          id="board-form-columns"
          value={board.columns}
          onChange={(columns) => {
            updateBoard({ columns });
          }}
          label="Columns"
          disabled={isLoading}
          placeholders={["e.g. Todo", "e.g. Doing", "e.g. Done"]}
          buttonLabel="+ Add New Column"
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
