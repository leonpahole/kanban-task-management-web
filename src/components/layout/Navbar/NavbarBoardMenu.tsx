import { AppMenu } from "@/components/shared/AppMenu";
import { BoardModels } from "@/util/board/board.models";
import IconVerticalEllipsis from "public/images/icon-vertical-ellipsis.svg";
import Image from "next/image";
import { EditBoardModal } from "@/components/board/boardList/EdtiBoardModal";
import { useState } from "react";
import { DeleteBoardModal } from "@/components/board/boardList/DeleteBoardModal";

interface IProps {
  board: BoardModels.Board | undefined;
}

export const NavbarBoardMenu = ({ board }: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [isEditBoardModalOpen, setIsEditBoardModalOpen] =
    useState<boolean>(false);

  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <AppMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        buttonDisabled={board == null}
        buttonContent={
          <Image
            src={IconVerticalEllipsis}
            alt="Open selected board menu"
            width="5"
            height="20"
            className="box-content px-2"
          />
        }
        menuClassName="flex w-full max-w-48 flex-col gap-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-very-dark"
        menuContent={
          <>
            <button
              type="button"
              className="text-start text-bl text-gray-medium"
              onClick={() => {
                setIsMenuOpen(false);
                setIsEditBoardModalOpen(true);
              }}
            >
              Edit board
            </button>
            <button
              type="button"
              className="text-start text-bl text-red-100"
              onClick={() => {
                setIsMenuOpen(false);
                setIsDeleteBoardModalOpen(true);
              }}
            >
              Delete board
            </button>
          </>
        }
      />
      {board && (
        <EditBoardModal
          board={board}
          isOpen={isEditBoardModalOpen}
          onClose={() => setIsEditBoardModalOpen(false)}
        />
      )}
      {board && (
        <DeleteBoardModal
          board={board}
          isOpen={isDeleteBoardModalOpen}
          onClose={() => setIsDeleteBoardModalOpen(false)}
        />
      )}
    </>
  );
};
