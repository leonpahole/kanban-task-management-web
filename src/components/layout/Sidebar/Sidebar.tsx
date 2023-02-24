import { BoardList } from "@/components/layout/Sidebar/BoardList/BoardList";
import { ColorSchemeSwitcher } from "@/components/layout/Sidebar/ColorSchemeSwitcher";
import { HideSidebarButton } from "@/components/layout/Sidebar/HideSidebarButton";
import { ShowSidebarButton } from "@/components/layout/Sidebar/ShowsidebarButton";
import { useLayout } from "@/providers/LayoutContext";

export const Sidebar = () => {
  const { isSidebarOpen, showSidebar, hideSidebar } = useLayout();

  return (
    <>
      <aside
        className={`flex w-75 flex-shrink-0 flex-col justify-between bg-white transition-spacing dark:bg-gray-dark ${
          isSidebarOpen ? "" : "-ml-75"
        }`}
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
        <div className="w-px bg-lines-light dark:bg-lines-dark" />
      )}
    </>
  );
};
