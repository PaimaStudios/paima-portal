import clsx from "clsx";

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
}: LaunchpadItemCardProps) {
  return (
    <div
      className={clsx(
        "relative border rounded-2xl flex flex-col gap-4 p-6",
        isHighlighted ? "border-brand" : "border-gray-600",
        onItemCardClick ? "hover:cursor-pointer" : "",
      )}
      onClick={onItemCardClick}
    >
      {!!counter && (
        <div className="absolute top-2 right-2 bg-brand text-gray-50 rounded-full w-8 h-8 p-1 flex items-center justify-center">
          <p className="text-heading5 text-gray-50 font-bold">x{counter}</p>
        </div>
      )}
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
