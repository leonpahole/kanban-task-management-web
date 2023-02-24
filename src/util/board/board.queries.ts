import { BoardService } from "@/util/board/board.service";
import { MathUtils } from "@/util/math.utils";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export namespace BoardQueries {
  export const useBoards = () => useQuery("boards", () => BoardService.list());

  export const useBoard = (id: number | null) =>
    useQuery(["boards", id], () => BoardService.get(id!), {
      enabled: id != null,
    });

  export const useSelectedBoard = () => {
    const router = useRouter();
    const { id } = router.query;

    return useBoard(MathUtils.parseNumber(id as string));
  };
}
