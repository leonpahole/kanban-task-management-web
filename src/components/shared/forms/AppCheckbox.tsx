interface IProps {
  id: string;
  label: string;
  value: boolean;
  onChange(value: boolean): void;
  disabled?: boolean;
}

export const AppCheckbox = ({
  id,
  label,
  value,
  onChange,
  disabled,
}: IProps) => {
  return (
    <label
      htmlFor={id}
      className="relative flex w-full cursor-pointer gap-4 rounded bg-gray-light p-3 hover:bg-purple-100 hover:bg-opacity-25 dark:bg-gray-very-dark"
    >
      <input
        id={id}
        type="checkbox"
        value={`${value}`}
        onChange={() => onChange(!value)}
        disabled={disabled}
        className="absolute h-0 w-0 opacity-0"
      />
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-sm border border-gray-medium border-opacity-20  after:absolute 
        after:top-1.5 after:h-2 after:w-2.5 
      ${
        value
          ? "bg-purple-100 after:block after:content-checkmark"
          : "bg-white after:hidden after:content-none dark:bg-gray-dark"
      }`}
      />
      <p
        className={`${
          value ? "line-through opacity-50" : ""
        } text-bm font-bold text-black dark:text-white`}
      >
        {label}
      </p>
    </label>
  );
};
