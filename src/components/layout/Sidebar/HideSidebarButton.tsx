import Image from "next/image";
import IconHideSidebar from "public/images/icon-hide-sidebar.svg";

interface IProps {
  onClick: () => void;
}

export const HideSidebarButton = ({ onClick }: IProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-4 px-8 py-4 text-hm text-gray-medium"
    >
      <Image src={IconHideSidebar} alt="" width="18" height="16" />
      <p>Hide sidebar</p>
    </button>
  );
};
