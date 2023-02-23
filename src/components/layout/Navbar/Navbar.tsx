import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { BoardModels } from "@/util/board/board.models";

interface IProps {
  selectedBoard?: BoardModels.Board;
}

export const Navbar = ({ selectedBoard }: IProps) => {
  return (
    <header className="flex items-center justify-between bg-white px-6 pt-5 pb-7 dark:bg-gray-dark">
      <h1 className="mb-1 text-hxl text-black dark:text-white">
        {selectedBoard?.name || ""}
      </h1>
      <div className="flex ">
        <PrimaryButton
          disabled={selectedBoard == null}
          className={selectedBoard ? "" : "invisible"}
        >
          + Add New Task
        </PrimaryButton>
      </div>
    </header>
  );
};
