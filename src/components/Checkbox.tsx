import { useId } from "react";

type CheckboxProps = {
  defaultChecked?: boolean;
  onCheckboxChecked?: (isChecked: boolean) => void;
};

const Checkbox = ({ defaultChecked, onCheckboxChecked }: CheckboxProps) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex items-center justify-center p-[3px] border border-gray-600 rounded w-5 h-5 hover:cursor-pointer"
    >
      <input
        id={id}
        type="checkbox"
        checked={defaultChecked}
        onChange={(e) => onCheckboxChecked?.(e.target.checked)}
        className="hidden peer"
      />
      <div className="w-3 h-3 peer-checked:bg-brand rounded-sm" />
    </label>
  );
};

export default Checkbox;
