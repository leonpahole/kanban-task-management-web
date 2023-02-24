import { useHover } from "@/hooks/useHover";
import Image from "next/image";
import IconHideSidebar from "public/images/icon-hide-sidebar.svg";
import IconHideSidebarPurple from "public/images/icon-hide-sidebar-purple.svg";

interface IProps {
  onClick: () => void;
}

export const HideSidebarButton = ({ onClick }: IProps) => {
  const { isHovered, setRef } = useHover();

  return (
    <button
      type="button"
      onClick={onClick}
      className="mr-6 flex items-center gap-4 rounded-r-full px-8 py-4 text-hm text-gray-medium hover:bg-purple-100 hover:bg-opacity-10 hover:text-purple-100 dark:hover:bg-white"
      ref={setRef}
    >
      <Image
        src={isHovered ? IconHideSidebarPurple : IconHideSidebar}
        alt=""
        width="18"
        height="16"
      />
      <p>Hide sidebar</p>
    </button>
  );
};
