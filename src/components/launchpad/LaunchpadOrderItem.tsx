import {
  CloseIcon,
  OutlinedMinusIcon,
  OutlinedPlusIcon,
} from "@components/icons/GeneralIcons";

type LaunchpadOrderItemProps = {
  title: string;
  quantity: number;
  price?: {
    value: number;
    currency: string;
  };
  onIncreaseQuantityClicked: () => void;
  onDecreaseQuantityClicked: () => void;
  onRemoveClicked: () => void;
  additionalText?: string;
};

const LaunchpadOrderItem = ({
  title,
  quantity,
  price,
  onIncreaseQuantityClicked,
  onDecreaseQuantityClicked,
  onRemoveClicked,
  additionalText,
}: LaunchpadOrderItemProps) => {
  return (
    <div className="flex flex-col gap-2 border border-gray-400 rounded-2xl py-3 px-4">
      <div className="flex items-start justify-between gap-4">
        <p className="text-heading5 text-gray-50">{title}</p>
        <div className="flex gap-2">
          <button
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-50 hover:cursor-pointer transition-colors ease-in-out duration-150"
            onClick={onIncreaseQuantityClicked}
          >
            <OutlinedPlusIcon />
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-50 hover:cursor-pointer transition-colors ease-in-out duration-150"
            onClick={onDecreaseQuantityClicked}
          >
            <OutlinedMinusIcon />
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-50 hover:cursor-pointer transition-colors ease-in-out duration-150"
            onClick={onRemoveClicked}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-brand text-heading5">x{quantity}</p>
        {price !== undefined && (
          <p className="text-brand text-heading5 font-bold">
            {price.value} {price.currency}
          </p>
        )}
        {additionalText && (
          <p className="text-bodyM text-gray-200">{additionalText}</p>
        )}
      </div>
    </div>
  );
};

export default LaunchpadOrderItem;
