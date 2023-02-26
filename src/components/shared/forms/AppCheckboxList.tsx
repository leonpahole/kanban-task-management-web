import { AppCheckbox } from "@/components/shared/forms/AppCheckbox";

export type AppCheckboxListValue = {
  id: number | string;
  value: boolean;
  label: string;
}[];

interface IProps {
  label: string;
  value: AppCheckboxListValue;
  onChange(id: number | string, newValue: boolean): void;
  className?: string;
  disabled?: boolean;
}

export const AppCheckboxList = ({
  label,
  value,
  onChange,
  className,
  disabled,
}: IProps) => {
  return (
    <fieldset className={className}>
      <legend className="mb-4 text-bm font-bold text-gray-medium dark:text-white">
        {label}
      </legend>

      <div className="flex flex-col gap-2">
        {value.map((val, i) => (
          <div className="flex gap-4" key={val.id}>
            <AppCheckbox
              id={`${val.id}-app-checkbox-list-${i}`}
              label={val.label}
              value={val.value}
              onChange={(newValue) => {
                onChange(val.id, newValue);
              }}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
};
