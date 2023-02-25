import { ButtonHTMLAttributes } from "react";

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "invert";
  size?: "sm" | "md";
};

export const AppButton = ({
  variant = "primary",
  size = "md",
  children,
  ...props
}: IProps) => {
  const variantClassMap: Record<typeof variant, string> = {
    primary: "bg-purple-100 text-white",
    invert: "bg-purple-100 bg-opacity-10 text-purple-100",
  };

  const variantHoverClassMap: Record<typeof variant, string> = {
    primary: "hover:bg-purple-hover",
    invert: "hover:bg-opacity-25",
  };

  const sizeClassMap: Record<typeof size, string> = {
    sm: "text-bl p-2",
    md: "text-hm py-3.5 px-6 ",
  };

  return (
    <button
      type="button"
      {...props}
      className={`font-bold ${props.className} ${variantClassMap[variant]} ${
        sizeClassMap[size]
      } rounded-3xl ${
        props.disabled ? "" : variantHoverClassMap[variant]
      } disabled:opacity-25`}
    >
      {children}
    </button>
  );
};
