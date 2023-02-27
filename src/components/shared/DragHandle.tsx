import Image from "next/image";
import DragHandleIcon from "public/images/drag-handle.svg";

interface IProps {
  className: string;
}

export const DragHandle = ({ className }: IProps) => {
  return (
    <Image
      src={DragHandleIcon}
      alt="Click and hold to drag"
      className={`cursor-grab ${className} box-content pl-2`}
      width="16"
      height="16"
    />
  );
};
