import { useEffect, useId, useState } from "react";
import clsx from "clsx";

type DEXInputProps = {
  label?: string;
  errorMessage?: string;
  value: string;
  placeholder?: string;
  onInputValueChange?: (value: string) => void;
  currencySymbol?: string;
  additionalSubInformation?: string;
  additionalSubComponent?: React.ReactNode;
  allowOnlyWholeNumbers?: boolean;
  showErrorsOnlyWhenTouched?: boolean;
};

const DEXInput = ({
  label,
  errorMessage,
  value,
  placeholder,
  onInputValueChange,
  currencySymbol,
  additionalSubInformation,
  additionalSubComponent,
  allowOnlyWholeNumbers = false,
  showErrorsOnlyWhenTouched = true,
}: DEXInputProps) => {
  const id = useId();

  const [isTouched, setIsTouched] = useState(!showErrorsOnlyWhenTouched);
  const [initialValue] = useState(value);

  // validates only the user manipulated value, doesn't validate the value from the `value` prop
  const handleInputValueChange = (value: string) => {
    if (!isTouched) {
      setIsTouched(true);
    }

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

  const showErrorMessage = isTouched && errorMessage;

  // make sure the `isTouched` variable gets updated also when the value changes from the prop, not only by user input
  useEffect(() => {
    if (isTouched) return;

    if (value !== initialValue) {
      setIsTouched(true);
    }
  }, [value, isTouched, initialValue]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-bodyL text-white" htmlFor={id}>
          {label}
        </label>
        {showErrorMessage && (
          <p className="text-error text-bodyM">{errorMessage}</p>
        )}
      </div>
      <div
        className={clsx(
          "border rounded-xl flex items-center justify-between py-3 pr-4 pl-6",
          showErrorMessage ? "border-error" : "border-gray-600",
        )}
      >
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          className={clsx(
            "bg-none w-full text-bodyL outline-none",
            showErrorMessage ? "text-error" : "text-white",
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
