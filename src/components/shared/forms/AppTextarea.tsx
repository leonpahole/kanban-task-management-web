import {
  AppInputError,
  AppInputLabel,
  getAppInputClassNames,
} from "@/components/shared/forms/AppInput";
import { TextareaHTMLAttributes } from "react";

type IProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label?: string;
  onTextChange?(text: string): void;
  error?: string | null;
  wrapperClassName?: string;
};

export const AppTextarea = ({
  label,
  onTextChange,
  error,
  wrapperClassName,
  ...props
}: IProps) => {
  const input = (
    <div className={`relative w-full ${wrapperClassName}`}>
      <textarea
        {...props}
        onChange={(e) => {
          props.onChange?.(e);
          onTextChange?.(e.target.value);
        }}
        aria-invalid={error != null}
        className={`${getAppInputClassNames(
          props.className,
          error
        )} resize-none`}
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
