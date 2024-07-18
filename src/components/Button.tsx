import clsx from "clsx";

export type ButtonProps = {
  text: string;
  onButtonClick?: () => void;
  disabled?: boolean;
};

const Button = ({ text, disabled = false, onButtonClick }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center uppercase font-medium text-white text-heading5 px-4 py-3 rounded-xl w-full transition-colors duration-150 ease-in-out",
        disabled
          ? "bg-gray-800 hover:cursor-not-allowed"
          : "bg-brand hover:cursor-pointer",
      )}
      onClick={disabled ? undefined : onButtonClick}
    >
      {text}
    </button>
  );
};

export default Button;
