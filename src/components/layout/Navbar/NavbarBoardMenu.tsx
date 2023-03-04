/* eslint-disable @next/next/no-html-link-for-pages */
import { DeleteBoardModal } from "@/components/board/boardList/DeleteBoardModal";
import { EditBoardModal } from "@/components/board/boardList/EdtiBoardModal";
import { AppMenu, AppMenuVerticalEllipsis } from "@/components/shared/AppMenu";
import { BoardModels } from "@/util/board/board.models";
import { useState } from "react";

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
        offset={[0, 24]}
        buttonContent={
          <AppMenuVerticalEllipsis
            alt="Open selected board menu"
            className="px-4"
          />
        }
        menuClassName="flex w-full max-w-48 flex-col gap-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-very-dark"
        menuContent={
          <>
            {board && (
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
            )}
            <a
              className="text-start text-bl text-gray-medium"
              href="/api/auth/logout"
            >
              Logout
            </a>
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
