import { useState } from "react";

type DEXSlippageInputProps = {
  defaultValue: number;
  onInputValueChangeSettled?: (value: number) => void;
};

const DEXSlippageInput = ({
  defaultValue,
  onInputValueChangeSettled,
}: DEXSlippageInputProps) => {
  const [value, setValue] = useState(defaultValue.toString());

  // validates only the user manipulated value, doesn't validate the value from the `value` prop
  const handleInputValueChange = (value: string) => {
    // convert comma to decimal point
    const replacedValue = value.replace(/,/g, ".");

    // enable only one decimal point
    if (replacedValue.split(".").length > 2) return;

    // allow only one zero at the beginning
    if (replacedValue.startsWith("00")) return;

    // allow only 2 decimal places
    const decimalPlaces = replacedValue.split(".")[1];
    if (decimalPlaces && decimalPlaces.length > 2) return;

    // enable only numbers and decimal point
    const regex = /^[0-9.]*$/;
    if (!regex.test(replacedValue)) return;

    setValue?.(replacedValue);
  };

  const handleNumberConversion = (value: string): number => {
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) return 0;

    return parsedValue;
  };

  return (
    <div className="flex items-center gap-1 justify-center py-1 px-3 uppercase text-white hover:text-white text-bodyS border border-gray-600 rounded-xl hover:cursor-pointer hover:border-brand transition-colors duration-150 ease-in-out max-w-16">
      <input
        onChange={(e) => handleInputValueChange(e.target.value)}
        onBlur={() => {
          const convertedValue = handleNumberConversion(value);

          onInputValueChangeSettled?.(handleNumberConversion(value));

          if (convertedValue === 0) setValue("0");
        }}
        className="bg-none w-full outline-none"
        value={value}
      />
      <span className="text-brand">%</span>
    </div>
  );
};

export default DEXSlippageInput;
