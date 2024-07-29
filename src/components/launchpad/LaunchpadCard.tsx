import { LaunchpadData } from "@hooks/dex/useGetAllLaunchpadsData";
import { Link } from "react-router-dom";

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
          <div className="w-28">
            <img
              src={image ?? "/images/game-icon-placeholder.svg"}
              alt={name}
              className="object-fit"
            />
          </div>
          {/* TODO: Extract to a Button component */}
          <Link to={`/launchpad/${slug}`}>
            <button
              className={
                "py-3 px-4 rounded-xl text-heading5 text-white border-brand border-2 font-semibold transition-colors duration-150 ease-in-out hover:bg-brand hover:cursor-pointer"
              }
            >
              Go to game Launchpad
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-heading3 font-semibold text-gray-50">{name}</h3>
          <p className="text-bodyM text-gray-200">{description}</p>
        </div>
      </div>
    </div>
  );
}
