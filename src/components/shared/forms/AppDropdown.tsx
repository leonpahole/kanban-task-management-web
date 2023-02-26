import {
  AppInputLabel,
  getAppInputClassNames,
} from "@/components/shared/forms/AppInput";

export interface AppDropdownOption {
  value: string | number;
  label: string;
}

interface IProps {
  id: string;
  label: string;
  options: AppDropdownOption[];
  value?: string | number;
  disabled?: boolean;
  onSelect(option: AppDropdownOption): void;
}

export const AppDropdown = ({
  id,
  label,
  options,
  value,
  disabled,
  onSelect,
}: IProps) => {
  return (
    <AppInputLabel id={id} label={label}>
      <select
        onChange={(e) => {
          const option = options.find(
            (o) => o.value.toString() === e.target.value
          );
          if (option) {
            onSelect(option);
          }
        }}
        disabled={disabled}
        value={value}
        className={getAppInputClassNames(undefined, undefined)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </AppInputLabel>
  );
};
