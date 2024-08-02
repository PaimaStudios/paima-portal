import { useEffect, useId, useState } from "react";
import clsx from "clsx";

type ReferralCodeInputProps = {
  value: string;
  placeholder?: string;
  onInputValueChange?: (value: string) => void;
  showErrorsOnlyWhenTouched?: boolean;
  hasError?: boolean;
  validityFeedback?: string;
};

const ReferralCodeInput = ({
  value,
  placeholder,
  onInputValueChange,
  showErrorsOnlyWhenTouched = true,
  hasError = false,
  validityFeedback,
}: ReferralCodeInputProps) => {
  const id = useId();

  const [isTouched, setIsTouched] = useState(!showErrorsOnlyWhenTouched);
  const [initialValue] = useState(value);

  // validates only the user manipulated value, doesn't validate the value from the `value` prop
  const handleInputValueChange = (value: string) => {
    if (!isTouched) {
      setIsTouched(true);
    }

    onInputValueChange?.(value);
  };

  const showError = isTouched && hasError;

  // make sure the `isTouched` variable gets updated also when the value changes from the prop, not only by user input
  useEffect(() => {
    if (isTouched) return;

    if (value !== initialValue) {
      setIsTouched(true);
    }
  }, [value, isTouched, initialValue]);

  return (
    <div className="border rounded-xl flex items-center justify-between py-3 pr-4 pl-6">
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        className="w-full text-bodyL outline-none"
        onChange={(e) => handleInputValueChange(e.target.value)}
      />
      <div>
        {validityFeedback && (
          <div
            className={clsx(
              "flex items-center justify-center py-1 px-3 uppercase text-white text-bodyM border rounded-xl",
              showError ? "border-error" : "border-brand",
            )}
          >
            {validityFeedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralCodeInput;
