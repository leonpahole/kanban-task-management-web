import { BoardModels } from "@/util/board/board.models";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IconBoard from "public/images/icon-board.svg";
import IconBoardWhite from "public/images/icon-board-white.svg";

export const boardListItemBaseClasses =
  "mr-6 flex items-center gap-4 rounded-r-full py-4 pl-8 pr-4 text-hm";

interface IProps {
  board: BoardModels.BoardExcerpt;
}

export const BoardListItem = ({ board }: IProps) => {
  const router = useRouter();
  const isActive = router.asPath === `/board/${board.id}`;

  return (
    <li>
      <Link
        href={`/board/${board.id}`}
        className={`${boardListItemBaseClasses} ${
          isActive ? "bg-purple-100 text-white" : "text-gray-medium"
        }`}
      >
        <Image
          src={isActive ? IconBoardWhite : IconBoard}
          width="16"
          height="16"
          alt=""
        />
        <p>{board.name}</p>
      </Link>
    </li>
  );
};
