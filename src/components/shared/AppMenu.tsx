import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import IconVerticalEllipsis from "public/images/icon-vertical-ellipsis.svg";
import Image from "next/image";

interface IMenuPopperProps {
  referenceElement: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  offset?: [number, number];
}

const useMenuPopper = ({
  referenceElement,
  isOpen,
  onClose,
  offset,
}: IMenuPopperProps) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const {
    styles: popperStyles,
    attributes,
    state,
  } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
      {
        name: "preventOverflow",
        options: {
          padding: {
            right: 24,
            left: 24,
          },
        },
      },
    ],
  });

  // close on click outside
  useEffect(() => {
    if (!isOpen || !state) {
      return undefined;
    }

    const onClickCloseIfOutside = (e: MouseEvent) => {
      if (!e.target) {
        return;
      }

      const clickedElement = e.target as Element;

      const clickedOnReferenceElement = (
        state.elements.reference as Element
      ).contains(clickedElement);

      // let popper handle reference element clicks - otherwise the click event is fired when we try to open the popper, and it closes immediately
      if (clickedOnReferenceElement) {
        return;
      }

      const clickedOnPopperElement =
        state.elements.popper.contains(clickedElement);

      if (!clickedOnPopperElement) {
        onClose();
      }
    };

    document.addEventListener("click", onClickCloseIfOutside);

    return () => {
      document.removeEventListener("click", onClickCloseIfOutside);
    };
  }, [onClose, isOpen, state]);

  // close on escape press
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyUpCloseIfEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keyup", onKeyUpCloseIfEscape);

    return () => {
      document.removeEventListener("keyup", onKeyUpCloseIfEscape);
    };
  }, [isOpen, onClose]);

  return { attributes, popperStyles, setPopperElement };
};

export interface IProps {
  buttonDisabled?: boolean;
  buttonContent: React.ReactNode;
  menuClassName?: string;
  menuContent: React.ReactNode;
  isOpen: boolean;
  onOpenChange(isOpen: boolean): void;
  offset?: [number, number];
}

export const AppMenu = ({
  buttonDisabled,
  buttonContent,
  menuClassName,
  menuContent,
  isOpen,
  onOpenChange,
  offset,
}: IProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );

  const { setPopperElement, popperStyles, attributes } = useMenuPopper({
    referenceElement,
    isOpen,
    onClose: () => onOpenChange(false),
    offset,
  });

  return (
    <>
      <button
        ref={setReferenceElement}
        type="button"
        onClick={() => {
          onOpenChange(!isOpen);
        }}
        disabled={buttonDisabled}
      >
        {buttonContent}
      </button>
      <div
        ref={setPopperElement}
        style={popperStyles.popper}
        className={`${
          isOpen ? "opacity-100" : "opacity-0"
        } flex w-full max-w-48 flex-col gap-4 rounded-lg bg-white p-4 shadow-lg transition-opacity dark:bg-gray-very-dark ${menuClassName}`}
        aria-hidden={!isOpen}
        {...attributes.popper}
      >
        {menuContent}
      </div>
    </>
  );
};

export const AppMenuVerticalEllipsis = ({ alt }: { alt: string }) => {
  return (
    <Image
      src={IconVerticalEllipsis}
      alt={alt}
      width="5"
      height="20"
      className="box-content px-2"
    />
  );
};
