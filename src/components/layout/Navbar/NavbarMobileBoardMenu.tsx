import { BoardList } from "@/components/board/boardList/BoardList";
import { ColorSchemeSwitcher } from "@/components/layout/Sidebar/ColorSchemeSwitcher";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface IProps {
  onModalOpen?(): void;
}

export const NavbarMobileBoardMenu = ({ onModalOpen }: IProps) => {
  const { isMd } = useBreakpoint("md");

  if (isMd) {
    return null;
  }

  return (
    <div
      style={{
        width: "calc(100vw - 2 * 24px)",
      }}
    >
      <BoardList className="mb-4" onModalOpen={onModalOpen} />
      <ColorSchemeSwitcher />
    </div>
  );
};
