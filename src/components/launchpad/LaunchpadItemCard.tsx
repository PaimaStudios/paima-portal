import clsx from "clsx";
import { useRef } from "react";

type LaunchpadItemCardProps = {
  title: string;
  description: string;
  price?: {
    value: number;
    currency: string;
  };
  imageURL?: string;
  imageSize?: "small" | "large";
  onItemCardClick?: () => void;
  isHighlighted?: boolean;
  counter?: number;
  supply?: number;
  quantityLeft?: number;
  showCounter?: boolean;
  showQuantityLeft?: boolean;
  showAdded?: boolean;
};

export default function LaunchpadItemCard({
  title,
  description,
  price,
  imageURL,
  imageSize = "large",
  onItemCardClick,
  isHighlighted = false,
  counter,
  supply,
  quantityLeft,
  showCounter = true,
  showQuantityLeft = true,
  showAdded = false,
}: LaunchpadItemCardProps) {
  const addedRef = useRef<HTMLDivElement>(null);
  const canClick = quantityLeft === undefined || quantityLeft > 0;
  return (
    <div
      className={clsx(
        "relative border rounded-2xl",
        isHighlighted ? "border-brand" : "border-gray-600",
        onItemCardClick && canClick ? "hover:cursor-pointer" : "",
        quantityLeft === 0 ? "bg-gray-900" : "",
      )}
      onClick={
        canClick
          ? () => {
              onItemCardClick?.();
              if (showAdded) {
                addedRef.current?.classList.remove("transition-opacity");
                addedRef.current?.classList.add("opacity-100");
                setTimeout(() => {
                  addedRef.current?.classList.add("transition-opacity");
                  addedRef.current?.classList.remove("opacity-100");
                  addedRef.current?.classList.add("opacity-0");
                }, 500);
              }
            }
          : undefined
      }
    >
      {!!counter && showCounter && (
        <div className="absolute top-2 right-2 bg-brand text-gray-50 rounded-full w-8 h-8 p-1 flex items-center justify-center z-10">
          <p className="text-heading5 text-gray-50 font-bold">x{counter}</p>
        </div>
      )}
      <div
        className={clsx(
          "flex flex-col gap-4 p-6 h-full",
          quantityLeft === 0 ? "opacity-50" : "",
        )}
      >
        {imageURL && (
          <div
            className={clsx(
              "w-full",
              imageSize === "small"
                ? "max-w-[100px] tablet:max-w-[150px]"
                : "max-w-[150px] tablet:max-w-[200px]",
            )}
          >
            <img
              src={imageURL ?? "/images/game-icon-placeholder.svg"}
              alt={title}
              className="object-fit"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {price !== undefined && (
            <p className="text-brand text-heading5 font-bold">
              {price.value} {price.currency}
            </p>
          )}
          <p className="text-heading4 text-gray-50 font-bold">{title}</p>
          <p className="text-bodyL text-gray-100">{description}</p>
        </div>
        {supply !== undefined && showQuantityLeft && (
          <div className="flex-grow content-end text-end">
            {`${
              quantityLeft === 0 ? "None" : `${quantityLeft} more`
            } left of ${supply}`}
          </div>
        )}
        {quantityLeft === 0 && !showCounter && (
          <p className="absolute top-6 right-0 text-heading5 text-gray-50 rotate-45">
            Sold out
          </p>
        )}
      </div>
      {showAdded && (
        <div
          className="absolute top-0 left-0 bg-gray-1100 w-full h-full opacity-0 rounded-2xl"
          ref={addedRef}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            Added!
          </div>
        </div>
      )}
    </div>
  );
}
