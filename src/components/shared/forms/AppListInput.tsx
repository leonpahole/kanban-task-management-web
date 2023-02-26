/* eslint-disable react/no-array-index-key */
import { AppButton } from "@/components/shared/AppButton";
import { AppInput } from "@/components/shared/forms/AppInput";
import Image from "next/image";
import IconCross from "public/images/icon-cross.svg";
import { useRef } from "react";

export type AppListInputValue = { id?: number; name: string }[];

interface IProps {
  id: string;
  value: AppListInputValue;
  onChange(value: AppListInputValue): void;
  label: string;
  disabled?: boolean;
  placeholders?: string[];
  buttonLabel: string;
  className?: string;
}

export const AppListInput = ({
  id,
  value,
  onChange,
  label,
  disabled,
  placeholders,
  buttonLabel,
  className,
}: IProps) => {
  const canAutoFocus = useRef<boolean>(false);

  const onInputValueChange = (index: number, text: string) => {
    const newValue = [...value];
    newValue[index].name = text;
    onChange(newValue);
  };

  const onInputAdd = () => {
    const newValue = [...value, { name: "" }];
    canAutoFocus.current = true;
    onChange(newValue);
  };

  const onInputRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <fieldset className={className}>
      <legend className="mb-2 text-bm font-bold capitalize text-gray-medium dark:text-white">
        {label}
      </legend>

      <div className="mb-3 flex flex-col gap-3">
        {value.map((val, i) => (
          <div className="flex gap-4" key={i}>
            <AppInput
              id={`${id}-app-list-input-${i}`}
              value={val.name}
              placeholder={placeholders?.[i]}
              onTextChange={(text) => onInputValueChange(i, text)}
              autoFocus={canAutoFocus.current}
              disabled={disabled}
            />
            <button
              type="button"
              onClick={() => onInputRemove(i)}
              disabled={disabled}
            >
              <Image src={IconCross} alt="Delete column" />
            </button>
          </div>
        ))}
      </div>

      <AppButton
        onClick={onInputAdd}
        variant="invert"
        size="sm"
        className="w-full"
        disabled={disabled}
      >
        {buttonLabel}
      </AppButton>
    </fieldset>
  );
};
