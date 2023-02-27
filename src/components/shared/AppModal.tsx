import Modal from "react-modal";

interface IProps {
  isOpen: boolean;
  onClose(): void;
  children: React.ReactNode;
  contentLabel: string;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnOverlayClick?: boolean;
}

export const AppModal = ({
  isOpen,
  onClose,
  contentLabel,
  children,
  shouldCloseOnEsc = false,
  shouldCloseOnOverlayClick = true,
}: IProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={contentLabel}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      className="absolute m-4 w-full max-w-[calc(100vw-2*16px)] rounded-md bg-white p-8 dark:bg-gray-dark md:max-w-120"
    >
      {children}
    </Modal>
  );
};
