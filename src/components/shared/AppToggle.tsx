/* eslint-disable jsx-a11y/label-has-associated-control */
import Toggle from "react-toggle";
import "react-toggle/style.css";

interface IProps {
  isChecked: boolean;
  onToggle: () => void;
  labelLeft: React.ReactNode;
  labelRight?: React.ReactNode;
  labelClassName?: string;
}

export const AppToggle = ({
  isChecked,
  onToggle,
  labelLeft,
  labelRight,
  labelClassName,
}: IProps) => {
  return (
    <label className={`flex items-center ${labelClassName}`}>
      {labelLeft}
      <Toggle
        checked={isChecked}
        onChange={onToggle}
        icons={false}
        className="app-toggle"
      />
      {labelRight}
    </label>
  );
};
