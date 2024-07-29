import { LaunchpadData } from "@hooks/dex/useGetAllLaunchpadsData";

import Button from "@components/Button";

type LaunchpadCardProps = Pick<
  LaunchpadData,
  "name" | "description" | "image" | "slug"
>;

export default function LaunchpadCard({
  name,
  description,
  image,
  slug,
}: LaunchpadCardProps) {
  return (
    <div className="p-[1px] bg-gradient-to-b from-gray-850 to-gray-1000 rounded-2xl">
      <div className="flex flex-col achievement-background rounded-2xl p-6 laptop:p-10 gap-6">
        <div className="flex items-start justify-between">
          <div className="max-w-[80px] tablet:max-w-[110px] w-full">
            <img
              src={image ?? "/images/game-icon-placeholder.svg"}
              alt={name}
              className="object-fit"
            />
          </div>
          <Button
            href={`/launchpad/${slug}`}
            text="Go to game Launchpad"
            outlineVariant
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-heading3 font-semibold text-gray-50">{name}</h3>
          <p className="text-bodyM text-gray-200">{description}</p>
        </div>
      </div>
    </div>
  );
}
