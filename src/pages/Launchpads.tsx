import useGetAllLaunchpadsData from "@hooks/dex/useGetAllLaunchpadsData";

import LaunchpadCard from "@components/launchpad/LaunchpadCard";

export default function Launchpads() {
  const { data, isLoading } = useGetAllLaunchpadsData();

  return (
    <div className="w-full py-6 container">
      <div className="flex flex-col gap-12">
        <h1 className="text-heading2 tablet:text-displayS font-formula font-bold">
          Launchpad
        </h1>
        {isLoading ? (
          // TOOD: Handle loading state
          <div className="animate-pulse h-64 w-full bg-gray-900 rounded-xl" />
        ) : !data ? (
          // TOOD: Handle error state
          <>Data failed to load</>
        ) : (
          <div className="flex flex-col gap-5">
            {data.map((launchpad) => (
              <LaunchpadCard
                key={launchpad.slug}
                name={launchpad.name}
                description={launchpad.description}
                image={launchpad.image}
                slug={launchpad.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
