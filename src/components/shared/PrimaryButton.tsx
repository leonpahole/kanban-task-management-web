import { ButtonHTMLAttributes } from "react";

type IProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = (props: IProps) => {
  return (
    <button
      type="button"
      {...props}
      className={`${props.className} rounded-3xl bg-purple-100 py-3.5 px-6 text-hm text-white disabled:opacity-25`}
    />
  );
};
