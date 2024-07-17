import { useId } from "react";
import clsx from "clsx";

type DEXInputProps = {
  label?: string;
  errorMessage?: string;
  value: string;
  onInputValueChange?: (value: string) => void;
  currencySymbol?: string;
  additionalSubInformation?: string;
  additionalSubComponent?: React.ReactNode;
  allowOnlyWholeNumbers?: boolean;
};

const DEXInput = ({
  label,
  errorMessage,
  value,
  onInputValueChange,
  currencySymbol,
  additionalSubInformation,
  additionalSubComponent,
  allowOnlyWholeNumbers = false,
}: DEXInputProps) => {
  const id = useId();

  // validates only the user manipulated value, doesn't validate the value from the `value` prop
  const handleInputValueChange = (value: string) => {
    // convert comma to decimal point
    const replacedValue = value.replace(/,/g, ".");

    if (allowOnlyWholeNumbers) {
      // allow only whole numbers
      if (replacedValue.includes(".")) return;
    }

    // enable only one decimal point
    if (replacedValue.split(".").length > 2) return;

    // allow only one zero at the beginning
    if (replacedValue.startsWith("00")) return;

    // enable only numbers and decimal point
    const regex = /^[0-9.]*$/;
    if (!regex.test(replacedValue)) return;

    onInputValueChange?.(replacedValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-bodyL text-white" htmlFor={id}>
          {label}
        </label>
        <p className="text-error text-bodyM">{errorMessage}</p>
      </div>
      <div
        className={clsx(
          "border rounded-xl flex items-center justify-between py-3 pr-4 pl-6",
          errorMessage ? "border-error" : "border-gray-600",
        )}
      >
        <input
          id={id}
          type="text"
          value={value}
          className={clsx(
            "bg-none w-full text-bodyL outline-none",
            errorMessage ? "text-error" : "text-white",
          )}
          onChange={(e) => handleInputValueChange(e.target.value)}
        />
        <div>
          {currencySymbol && (
            <div className="flex items-center justify-center py-1 px-3 uppercase text-white text-bodyM border border-brand rounded-xl">
              {currencySymbol}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        {additionalSubInformation && (
          <p className="text-gray-200 text-bodyS">{additionalSubInformation}</p>
        )}
        {additionalSubComponent}
      </div>
    </div>
  );
};

export default DEXInput;
