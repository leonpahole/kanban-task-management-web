import { boardListItemBaseClasses } from "@/components/layout/Sidebar/BoardList/BoardListItem";
import Image from "next/image";
import IconBoardPurple from "public/images/icon-board-purple.svg";

interface IProps {
  onClick: () => void;
}

export const BoardListItemAdd = ({ onClick }: IProps) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`${boardListItemBaseClasses} text-purple-100`}
        type="button"
      >
        <Image src={IconBoardPurple} width="16" height="16" alt="" />
        <p>+ Create New Board</p>
      </button>
    </li>
  );
};
