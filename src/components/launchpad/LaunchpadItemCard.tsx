import Button from "@components/Button";
import { Currency } from "@pages/LaunchpadDetail";
import clsx from "clsx";

type LaunchpadItemCardProps = {
  title: string;
  description: string;
  price?: {
    value: number;
    currency: Currency;
  };
  imageURL?: string;
  imageSize?: "small" | "large";
  onItemCardClick?: () => void;
};

export default function LaunchpadItemCard({
  title,
  description,
  price,
  imageURL,
  imageSize = "large",
  onItemCardClick,
}: LaunchpadItemCardProps) {
  return (
    <div className="border border-gray-600 rounded-2xl flex flex-col gap-4 p-6">
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
    </div>
  );
}
