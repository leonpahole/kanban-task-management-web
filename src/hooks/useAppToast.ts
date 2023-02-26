import { useCallback } from "react";
import { toast } from "react-toastify";

export const useAppToast = () => {
  const success = useCallback((message: string) => {
    toast.success(message);
  }, []);

  const error = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const formattedError = useCallback((message?: string | null) => {
    toast.error(
      `An error has occured: ${message ?? "Unknown error"}. Please try again.`
    );
  }, []);

  return { success, error, formattedError };
};
