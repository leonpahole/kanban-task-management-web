import { AppMenu, AppMenuVerticalEllipsis } from "@/components/shared/AppMenu";
import { useState } from "react";

interface IProps {
  onEditClick(): void;
  onDeleteClick(): void;
}

export const ViewTaskModalMenu = ({ onEditClick, onDeleteClick }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AppMenu
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      buttonContent={<AppMenuVerticalEllipsis alt="Open selected board menu" />}
      offset={[0, 24]}
      menuContent={
        <>
          <button
            type="button"
            className="text-start text-bl text-gray-medium"
            onClick={() => {
              setIsOpen(false);
              onEditClick();
            }}
          >
            Edit Task
          </button>
          <button
            type="button"
            className="text-start text-bl text-red-100"
            onClick={() => {
              setIsOpen(false);
              onDeleteClick();
            }}
          >
            Delete Task
          </button>
        </>
      }
    />
  );
};
