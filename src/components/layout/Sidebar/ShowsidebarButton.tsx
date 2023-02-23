import Image from "next/image";
import IconShowSidebar from "public/images/icon-show-sidebar.svg";

interface IProps {
  isVisible: boolean;
  onClick: () => void;
}

export const ShowSidebarButton = ({ isVisible, onClick }: IProps) => {
  return (
    <button
      className={`fixed bottom-8 left-0 z-10 bg-purple-100 transition-transform ${
        isVisible ? "opacity-1 translate-x-0" : " -translate-x-full opacity-0"
      } rounded-r-full py-4.5 pr-5.5 pl-4.5`}
      onClick={onClick}
      type="button"
    >
      <Image src={IconShowSidebar} alt="Open the sidebar" />
    </button>
  );
};
