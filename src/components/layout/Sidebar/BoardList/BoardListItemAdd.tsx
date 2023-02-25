import { AddBoardModal } from "@/components/layout/Sidebar/BoardList/AddBoardModal";
import {
  boardListItemBaseClasses,
  boardListItemHoverClasses,
} from "@/components/layout/Sidebar/BoardList/BoardListItem";
import Image from "next/image";
import IconBoardPurple from "public/images/icon-board-purple.svg";
import { useState } from "react";

export const BoardListItemAdd = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <>
      <li className="flex">
        <button
          onClick={() => {
            setIsAddModalOpen(true);
          }}
          className={`${boardListItemBaseClasses} ${boardListItemHoverClasses} flex-1 text-purple-100`}
          type="button"
        >
          <Image src={IconBoardPurple} width="16" height="16" alt="" />
          <p>+ Create New Board</p>
        </button>
      </li>
      <AddBoardModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
      />
    </>
  );
};
