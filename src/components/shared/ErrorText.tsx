interface IProps {
  className?: string;
  error: Error;
  defaultMessage?: string;
  onRetryClick?(): void;
}

export const ErrorText = ({
  className,
  error,
  defaultMessage = "Unknown error",
  onRetryClick,
}: IProps) => {
  return (
    <div className={`${className} text-center`}>
      <p className="text-red-100">{error?.message ?? defaultMessage}</p>
      {onRetryClick && (
        <button
          onClick={onRetryClick}
          type="button"
          className="text-gray-medium underline dark:text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
};
