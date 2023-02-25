import { forwardRef, InputHTMLAttributes } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  onTextChange?(text: string): void;
  error?: string | null;
  wrapperClassName?: string;
};

export const AppInput = forwardRef<HTMLInputElement, IProps>(
  ({ label, onTextChange, error, wrapperClassName, ...props }: IProps, ref) => {
    const input = (
      <div className={`relative w-full ${wrapperClassName}`}>
        <input
          {...props}
          ref={ref}
          onChange={(e) => {
            props.onChange?.(e);
            onTextChange?.(e.target.value);
          }}
          aria-invalid={error != null}
          className={`${
            props.className
          } w-full rounded border border-gray-medium border-opacity-25 bg-transparent py-2 px-4 text-bm 
        text-black placeholder:text-black 
        placeholder:opacity-25 focus:outline 
        focus:outline-purple-hover dark:text-white dark:placeholder:text-white
        ${error != null ? "outline outline-red-100" : ""}
        `}
        />
        {error != null && (
          <div className="absolute inset-y-0 right-4 flex items-center justify-center">
            <p className="text-bl text-red-100">{error}</p>
          </div>
        )}
      </div>
    );

    if (!label) {
      return input;
    }

    return (
      <label htmlFor={props.id}>
        <p className="mb-2 text-bm font-bold capitalize text-gray-medium dark:text-white">
          {label}
        </p>
        {input}
      </label>
    );
  }
);
