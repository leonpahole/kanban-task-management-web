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
      className="absolute w-full max-w-120 rounded-md bg-white p-8 dark:bg-gray-dark"
    >
      {children}
    </Modal>
  );
};
