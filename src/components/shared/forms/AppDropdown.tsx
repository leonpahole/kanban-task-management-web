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
  onSelect(option: AppDropdownOption): void;
}

export const AppDropdown = ({
  id,
  label,
  options,
  value,
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
