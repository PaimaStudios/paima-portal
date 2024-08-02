import clsx from "clsx";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export type ButtonProps = {
  text: string | ReactElement;
  href?: string;
  onButtonClick?: () => void;
  disabled?: boolean;
  smallVariant?: boolean;
  outlineVariant?: boolean;
  additionalClasses?: string;
  isLoading?: boolean;
  isPending?: boolean;
};

const Button = <T extends React.ElementType = "button">({
  text,
  disabled = false,
  onButtonClick,
  smallVariant = false,
  outlineVariant = false,
  href,
  additionalClasses,
  isLoading,
  isPending,
}: ButtonProps & { as?: T }) => {
  const Component = href ? Link : "button";
  disabled = disabled || !!isPending || !!isLoading;

  return (
    <Component
      to={href || ""}
      className={clsx(
        "flex items-center justify-center font-medium text-white rounded-xl transition-colors duration-150 ease-in-out",
        smallVariant ? "text-heading6 px-3 py-2" : "text-heading5 px-4 py-3",
        disabled ? "hover:cursor-not-allowed" : "hover:cursor-pointer",
        disabled
          ? outlineVariant
            ? "border hover:bg-gray-800 border-gray-800"
            : "bg-gray-800"
          : outlineVariant
          ? "border hover:bg-brand border-brand"
          : "bg-brand",
        additionalClasses,
      )}
      onClick={disabled ? undefined : onButtonClick}
    >
      {isPending
        ? "Confirm transaction..."
        : isLoading
        ? "Transaction pending..."
        : text}
    </Component>
  );
};

export default Button;
