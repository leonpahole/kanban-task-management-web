import { AppButton } from "@/components/shared/AppButton";
import { AppModal } from "@/components/shared/AppModal";
import { AppInput } from "@/components/shared/forms/AppInput";
import {
  AppListInput,
  AppListInputValue,
} from "@/components/shared/forms/AppListInput";
import { useAppToast } from "@/hooks/useAppToast";
import { BoardQueries } from "@/util/board/board.queries";
import { StringUtils } from "@/util/string.utils";
import { useRouter } from "next/router";
import { useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const AddBoardModal = ({ isOpen, onClose }: IProps) => {
  const router = useRouter();
  const toast = useAppToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);

  const [columnNames, setColumnNames] = useState<AppListInputValue>([""]);

  const addBoardMutation = BoardQueries.useAddBoard();

  const onAdd = async () => {
    if (!StringUtils.isNotBlank(name)) {
      setNameError("Can't be empty");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const newBoard = await addBoardMutation.mutateAsync({
        name,
        columnNames: columnNames.filter(StringUtils.isNotBlank),
      });

      onClose();

      router.push(`/board/${newBoard.id}`);

      resetForm();
    } catch (e: any) {
      toast.formattedError(e?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setColumnNames([""]);
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      contentLabel="Add a new board"
      shouldCloseOnEsc={!isLoading}
      shouldCloseOnOverlayClick={!isLoading}
    >
      <h2 className="mb-6 text-hl text-black dark:text-white">Add new board</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd();
        }}
      >
        <AppInput
          id="add-board-name"
          label="Board name"
          placeholder="e.g. Web Design"
          wrapperClassName="mb-6"
          value={name}
          onTextChange={setName}
          error={nameError}
          autoFocus
          disabled={isLoading}
        />

        <AppListInput
          id="columnList"
          value={columnNames}
          onChange={setColumnNames}
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
          Save Changes
        </AppButton>
      </form>
    </AppModal>
  );
};
