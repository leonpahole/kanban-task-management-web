/* eslint-disable react/no-array-index-key */
import { AppButton } from "@/components/shared/AppButton";
import { AppInput } from "@/components/shared/forms/AppInput";
import Image from "next/image";
import IconCross from "public/images/icon-cross.svg";

export type AppListInputValue = string[];

interface IProps {
  id: string;
  value: AppListInputValue;
  onChange(value: AppListInputValue): void;
  label: string;
  disabled?: boolean;
}

export const AppListInput = ({
  id,
  value,
  onChange,
  label,
  disabled,
}: IProps) => {
  const onInputValueChange = (index: number, text: string) => {
    const newValue = [...value];
    newValue[index] = text;
    onChange(newValue);
  };

  const onInputAdd = () => {
    const newValue = [...value, ""];
    onChange(newValue);
  };

  const onInputRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <fieldset>
      <legend className="mb-2 text-bm font-bold capitalize text-gray-medium dark:text-white">
        {label}
      </legend>

      <div className="mb-3 flex flex-col gap-3">
        {value.map((val, i) => (
          <div className="flex gap-4">
            <AppInput
              id={`${id}-app-list-input-${i}`}
              key={i}
              value={val}
              placeholder="e.g. Todo"
              onTextChange={(text) => onInputValueChange(i, text)}
              autoFocus={i > 0}
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
        + Add New Column
      </AppButton>
    </fieldset>
  );
};
