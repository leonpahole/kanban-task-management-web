import { AppButton } from "@/components/shared/AppButton";
import { AppModal } from "@/components/shared/AppModal";
import { useAppToast } from "@/hooks/useAppToast";
import { useState } from "react";

interface IProps {
  heading: string;
  description: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  successMessage: string;
  onConfirm(): Promise<void>;
  onCancel(): void;
  isOpen: boolean;
  onClose(): void;
}

export const DeleteConfirmationModal = ({
  heading,
  description,
  confirmButtonLabel,
  cancelButtonLabel,
  successMessage,
  onConfirm,
  onCancel,
  isOpen,
  onClose,
}: IProps) => {
  const toast = useAppToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onConfirmClick = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      await onConfirm();
      toast.success(successMessage);
    } catch (e: any) {
      toast.formattedError(e?.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      shouldCloseOnEsc={!isLoading}
      shouldCloseOnOverlayClick={!isLoading}
      contentLabel={heading}
    >
      <h2 className="mb-6 text-hl text-red-100">{heading}</h2>
      <p className="mb-6 text-bl text-gray-medium">{description}</p>
      <div className="flex gap-4">
        <AppButton
          variant="danger"
          onClick={onConfirmClick}
          disabled={isLoading}
          className="flex-1"
        >
          {confirmButtonLabel}
        </AppButton>
        <AppButton
          variant="invert"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          {cancelButtonLabel}
        </AppButton>
      </div>
    </AppModal>
  );
};
