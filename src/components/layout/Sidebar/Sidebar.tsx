import { BoardList } from "@/components/board/boardList/BoardList";
import { ColorSchemeSwitcher } from "@/components/layout/Sidebar/ColorSchemeSwitcher";
import { HideSidebarButton } from "@/components/layout/Sidebar/HideSidebarButton";
import { ShowSidebarButton } from "@/components/layout/Sidebar/ShowsidebarButton";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLayout } from "@/providers/LayoutContext";

export const Sidebar = () => {
  const { isSidebarOpen, showSidebar, hideSidebar } = useLayout();
  const { isMd } = useBreakpoint("md");

  if (!isMd) {
    return null;
  }

  return (
    <>
      <aside
        className={`w-65 flex-shrink-0 flex-col justify-between bg-white pt-7 transition-spacing dark:bg-gray-dark lg:w-75 lg:pt-4 ${
          isSidebarOpen ? "" : "md:-ml-65 lg:-ml-75"
        } flex`}
        aria-hidden={!isSidebarOpen}
      >
        <div>
          <BoardList />
        </div>
        <div className="mb-8 flex flex-col gap-2">
          <ColorSchemeSwitcher />
          <HideSidebarButton onClick={hideSidebar} />
        </div>
        <ShowSidebarButton isVisible={!isSidebarOpen} onClick={showSidebar} />
      </aside>
      {isSidebarOpen && (
        <div className="hidden w-px bg-lines-light dark:bg-lines-dark md:block" />
      )}
    </>
  );
};
