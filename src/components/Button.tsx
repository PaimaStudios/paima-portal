import clsx from "clsx";

export type ButtonProps = {
  text: string;
  onButtonClick?: () => void;
  disabled?: boolean;
  smallVariant?: boolean;
  outlineVariant?: boolean;
};

const Button = ({
  text,
  disabled = false,
  onButtonClick,
  smallVariant = false,
  outlineVariant = false,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center uppercase font-medium text-white rounded-xl w-full transition-colors duration-150 ease-in-out",
        smallVariant ? "text-heading6 px-3 py-2" : "text-heading5 px-4 py-3",
        disabled ? "hover:cursor-not-allowed" : "hover:cursor-pointer",
        disabled
          ? outlineVariant
            ? "border hover:bg-gray-800 border-gray-800"
            : "bg-gray-800"
          : outlineVariant
          ? "border hover:bg-brand border-brand"
          : "bg-brand",
      )}
      onClick={disabled ? undefined : onButtonClick}
    >
      {text}
    </button>
  );
};

export default Button;
