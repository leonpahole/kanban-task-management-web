import { InputHTMLAttributes } from "react";

export const getAppInputClassNames = (
  className: string | undefined,
  error: string | null | undefined
) => {
  return `${className} w-full rounded border border-gray-medium border-opacity-25 bg-transparent py-2 px-4 text-bm 
        text-black placeholder:text-black 
        placeholder:opacity-25 focus:outline 
        focus:outline-purple-hover dark:text-white dark:placeholder:text-white
        ${error != null ? "outline outline-red-100" : ""}
        `;
};

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  onTextChange?(text: string): void;
  error?: string | null;
  wrapperClassName?: string;
  rows?: number;
};

export const AppInput = ({
  label,
  onTextChange,
  error,
  wrapperClassName,
  rows,
  ...props
}: IProps) => {
  const input = (
    <div className={`relative w-full ${wrapperClassName}`}>
      <input
        {...props}
        onChange={(e) => {
          props.onChange?.(e);
          onTextChange?.(e.target.value);
        }}
        aria-invalid={error != null}
        className={getAppInputClassNames(props.className, error)}
      />
      <AppInputError error={error} />
    </div>
  );

  if (!label) {
    return input;
  }

  return (
    <AppInputLabel id={props.id} label={label}>
      {input}
    </AppInputLabel>
  );
};

export const AppInputError = ({
  error,
}: {
  error: string | null | undefined;
}) => {
  if (!error) {
    return null;
  }

  return (
    <div className="absolute inset-y-0 right-4 flex items-center justify-center">
      <p className="text-bl text-red-100">{error}</p>
    </div>
  );
};

export const AppInputLabel = ({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor={id}>
      <p className="mb-2 text-bm font-bold capitalize text-gray-medium dark:text-white">
        {label}
      </p>
      {children}
    </label>
  );
};
