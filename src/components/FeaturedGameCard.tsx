import { GameProps } from "@pages/Games";
import clsx from "clsx";

type FeaturedGameCardProps = Pick<
  GameProps,
  "title" | "description" | "coverImageURL"
> & {
  additionalClassname?: string;
};

const FeaturedGameCard = ({
  title,
  description,
  coverImageURL,
  additionalClassname,
}: FeaturedGameCardProps) => {
  return (
    <div
      className={clsx(
        "p-[1px] bg-gradient-to-b from-gray-850 to-gray-1000 rounded-2xl flex flex-col w-full",
        additionalClassname,
      )}
    >
      <div className="flex-1 flex flex-col achievement-background rounded-2xl">
        <div
          className="w-full h-40 rounded-t-2xl bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${
              coverImageURL ?? "/images/featured-game-placeholder.svg"
            })`,
          }}
        />
        <div className="p-6 flex flex-col gap-4">
          <h3 className="text-heading3 font-semibold text-gray-50">{title}</h3>
          <p className="text-bodyM text-gray-200">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGameCard;
